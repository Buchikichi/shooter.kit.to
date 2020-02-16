class Stage {
	constructor() {
		this.foreground = null;
		this.viewDic = {};
		this.lastScan = null;
		this.performersList = [];
		this.hasGuide = false;
		this.effector = new StageEffector(this);
	}

	get isMoving() {
		return this.scroll != Stage.SCROLL.STOP;
	}

	get fg() {
		if (!this.foreground) {
			this.foreground = this.map._mainVisual;
		}
		return this.foreground;
	}

	get length() {
		return this.map._mainVisual.image.width * this.repeat;
	}

	get width() {
		return this.map._mainVisual.image.width;
	}

	get height() {
		return this.map._mainVisual.image.height;
	}

	get isLoop() {
		return this.scroll == Stage.SCROLL.LOOP;
	}

	get startPos() {
		let hW = this._product.width / this.map._mainVisual.speed / 2;

		return this.posV * hW;
	}

	playBgm() {
		let audio = Mediaset.Instance.getAudio(this.startAudioType, this.startAudioSeq);

		if (audio) {
			// console.log('Stage#playBgm:');
			// console.log(audio);
			AudioMixer.INSTANCE.play(audio.id, .7, true);
		}
	}

	start() {
console.log('Stage#start :' + this.performersList.length);
		this.performersList.forEach(actor => {
			actor.x += this.map.x;
			actor.y += this.map.y;
			actor._stage = this;
		});
		// Add MapVisual
		this.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	retry() {
console.log('Stage#retry!');
		this.reset();
		Transition.Instance.play(this.startTransition, this.startSpeed);
		if (Product.Instance.crashBgm != Product.CrashHandling.Bgm.Keep) {
			this.playBgm();
		}
	}

	scrollV(target) {
		this.effectV = 0;
		if (this.scroll == Stage.SCROLL.OFF) {
			return;
		}
		let diff = this._product.hH - target.y;
		let fg = this.fg;

		if (this.scroll == Stage.SCROLL.TOP) {
			diff = fg.speed * 5;
		} else if (this.scroll == Stage.SCROLL.BOTTOM) {
			diff = -fg.speed * 5;
		} else if (Math.abs(diff) < fg.speed) {
			return;
		}
		let dy = diff / 3;
		let nextY = fg.y - dy;
		let fgViewY = fg.image.height - this._product.height;

		if (this.scroll == Stage.SCROLL.ON) {
			if (nextY < 0 || fgViewY < nextY) {
				return;
			}
		}
	//console.log('Y:' + fg.y);
		if (this.scroll == Stage.SCROLL.TOP && nextY < 0) {
			this.scroll = Stage.SCROLL.OFF;
			return;
		}
		if (this.scroll == Stage.SCROLL.BOTTOM) {
console.log('nextY:' + nextY + '/' + fg.image.height);
			if (fgViewY < nextY) {
				this.scroll = Stage.SCROLL.OFF;
				return;
			}
		}
		this.effectV = dy;
	}

	effect(target) {
		let mainVisual = this.map._mainVisual/*this.fg*/;

		if (target instanceof MapVisual) {
			return;
		}
		if (!this.isMoving) {
			return;
		}
		if (this.isLoop) {
			let cy = mainVisual.y + target.y;

			if (cy < 0) {
				target.y += this.height;
			}
			if (this.height < cy) {
				target.y -= this.height;
			}
		}
		if (target.effectH) {
			// console.log('Stage#effect effectH:' + target.constructor.name);
			target.x -= Math.cos(mainVisual.radian) * mainVisual.speed;
		}
		if (target.effectV) {
			// console.log('Stage#effect effectV:' + target.constructor.name);
			target.y -= Math.sin(mainVisual.radian) * mainVisual.speed;
		}
		this.map.checkHit(target);
	}

	effectMap(ship) {
		let fg = this.map._mainVisual/*this.fg*/;
		let img = fg.image;
		let h = img.height;
		let x = ship.x - fg.x;
		let y = (ship.y + fg.y + h) % h;
		let qt = this._product.hH / 2;
		let top = qt;
		let bottom = this._product.height - qt;

		if (this.scroll & (Stage.SCROLL.ON | Stage.SCROLL.LOOP)) {
			if (y < top) {
				if (this.map.addProgressH(ship.speed)) {
					ship.y += ship.speed;
				}
			}
			if (bottom < y) {
				if (this.map.addProgressH(-ship.speed)) {
					ship.y -= ship.speed;
				}
			}
		}
	}

	scanEvent() {
		let result = [];
		let fg = this.fg;
		let gx = -fg.x;
		let bw = this.map.brickSize;
		let rear = Math.round(gx / bw);

		if (rear == this.lastScan) {
			return result;
		}
		//
		let front = Math.round((gx + this._product.width) / bw);
		let newList = [];

		this._eventList.forEach(s => {
			s.x = rear * bw;
			if (front < s.v) {
				newList.push(s);
				return;
			}
			let evt = this.executeEvent(s);
			if (evt) {
				if (evt instanceof Actor) {
					result.push(evt);
				}
				return;
			}
			let spawn = false;
			let isFront = s.op == 'Spw';

			if (isFront && s.v <= front) {
				spawn = true;
			}
			if (s.op == 'Rev' && s.v <= rear) {
console.log(s);
				spawn = true;
			}
			if (!spawn) {
				newList.push(s);
				return;
			}
			// spawn
			let x = gx + (isFront ? this._product.width + bw * 1.5 : 16);
			let y = (s.h + 1) * bw;
			let reserve = Enemy.assign(s.number, x, y);

			if (reserve != null) {
				let enemy;

				if (reserve.formation) {
					enemy = new Formation(reserve.x, reserve.y).setup(reserve.type, 8);
				} else {
					enemy = new reserve.type(reserve.x, reserve.y);
				}
if (!isFront) enemy.dir = 0;
				enemy._stage = this;
				result.push(enemy);
			}
		});
		this._eventList = newList;
		this.lastScan = rear;
		return result;
	}

	executeEvent(rec) {
		let op = rec.op;

		if (op == 'Bos') {
			this.phase = Stage.PHASE.BOSS;
			return true;
		}
		if (op == 'Stp') {
			this.scroll = Stage.SCROLL.STOP;
			return true;
		}
		if (op == 'Nxt') {
			this.phase = Stage.PHASE.NEXT_STAGE;
			return true;
		}
		if (op == 'Efi' || op == 'Efo') {
			// Fade in/out.
			this.effector.start(op);
			return true;
		}
		if (op == 'Afa') {
			AudioMixer.INSTANCE.fade();
			return true;
		}
		if (op == 'Apl') {
			let audio = Mediaset.Instance.getAudio(rec.type, rec.number);

			AudioMixer.INSTANCE.play(audio.id, .7, true);
			return true;
		}
		return false;
	}

	notice() {
		if (this.scroll != Stage.SCROLL.ON && this.scroll != Stage.SCROLL.LOOP) {
			return;
		}
		let fg = this.fg;

		if (fg.y < fg.image.height / 2) {
			this.scroll = Stage.SCROLL.TOP;
		} else {
			this.scroll = Stage.SCROLL.BOTTOM;
		}
	}

	removeMapVisual() {
		this.performersList = this.performersList.filter(actor => !(actor instanceof MapVisual));
		this.performersList.forEach(actor => {
			actor.x -= this.map.x;
			actor.y -= this.map.y;
		});
		return this.performersList;
	}

	move(target) {
		this.effector.move();
		this.scanEvent().forEach(enemy => this.performersList.push(enemy));
		this.performersList.sort((a, b) => a.z - b.z);
		if (this.scroll == Stage.SCROLL.STOP) {
			return;
		}
		let mainVisual = this.map._mainVisual;
		let max = this.length - Product.Instance.width;

		this.scrollV(target);
		this.map.setProgress(this.progress++);
//console.log('x:' + -mainVisual.x + '/max:' + max);
		if (max < -mainVisual.x) {
			//this.phase = Stage.PHASE.NEXT_STAGE;
			this.progress = -this.startPos;
		}
		// let fgX = this.fg.x;

		// Stage.CHECK_POINT.forEach(cp => {
		// 	if (cp.x <= fgX && this.checkPoint.x < fgX) {
		// 		this.checkPoint = cp;
		// 	}
		// });
	}

	draw(ctx) {
		Transition.Instance.draw();
		this.performersList.forEach(actor => actor.draw(ctx));
	}

	createFieldMap() {
		return FieldMap.create(this.map);
	}

	reset() {
		// console.log('Stage#reset');
		this.phase = Stage.PHASE.NORMAL;
		this.progress = -this.startPos;
		this.hibernate = this._product.maxHibernate;
		this.scroll = this.roll;
		this.effectH = 0;
		this.effectV = 0;
		this.map.reset();
		this.map.setProgress(this.progress);
		this.effector.reset();
		this._eventList = this.scenarioList.concat();
	}

	init() {
		// console.log('Stage#init' + this.id);
		this.map._stage = this;
		this.map = this.createFieldMap();
		// console.log('Stage#init map:' + this.map.constructor.name);
		this.scenarioList = this.scenarioList.map(s => Scenario.create(s, this));
		Mediaset.Instance.checkLoading().then(() => this.reset());
		this.checkPoint = this.progress;
		return this;
	}

	static create(rec) {
		return Object.assign(new Stage(), rec).init();
	}
}
Stage.SCROLL = {
	OFF: 0,
	ON: 1,
	LOOP: 2,
	TOP: 4,
	BOTTOM: 8,
	STOP: 16,
};
Stage.PHASE = {
	NORMAL: 0,
	BOSS: 1,
	NEXT_STAGE: 2,
};
Stage.VIEWS = ['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'];
Stage.CHECK_POINT = [{x:0, y:0}, {x:660, y:0}, {x:1440, y:0}];

class Stage {
	constructor() {
		this.foreground = null;
		this.viewDic = {};
		this.lastScan = null;
		this.performersList = [];
		this.hasGuide = false;
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
		return this._product.hW * this.posV;
	}

	get startProgress() {
		return -this.startPos / this.map._mainVisual.speed;
	}

	setupVisualList() {
		this.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	start(isFirst) {
		console.log('Stage#start :' + isFirst);
		if (isFirst) {
			this._product._mediaset.playBgm(this.startAudioSeq);
			Transition.Instance.play(this.startTransition, this.startSpeed);
		} else {
			let pos = this.startPos;

			this.performersList.forEach(a => {
				a.x -= pos
				a._stage = this;
			});
			this._product._mediaset.playBgm(this.sequelAudioSeq);
		}
		this.setupVisualList();
	}

	retry() {
		console.log('Stage#retry!');
		this.reset(Stage.PHASE.NORMAL);
		this.performersList.push(this.checkPoint.retrieve());
		Transition.Instance.play(this.startTransition, this.startSpeed);
		if (Product.Instance.crashBgm != Product.CrashHandling.Bgm.Keep) {
			this._product._mediaset.playBgm(this.startAudioSeq);
		}
	}

	scrollV() {
		let ship = this.performersList.find(a => a instanceof Ship);

		this.effectV = 0;
		if (!ship || this.scroll == Stage.SCROLL.OFF) {
			return;
		}
		let diff = this._product.hH - ship.y;
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
		if (this._product.effector.isBrickVisible || !(target instanceof Ship)) {
			this.map.checkHit(target);
		}
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

	getActor(seq, x = 0, y = 0) {
		return this._product._mediaset.getActor(seq, { x: x, y: y, _stage: this });
	}

	scanEvent() {
		let result = [];
		let gx = -this.map._mainVisual.x;
		let bw = this.map.brickSize;
		let rear = Math.round(gx / bw);

		if (rear == this.lastScan) {
			return result;
		}
		//
		let front = Math.round((gx + this._product.width) / bw);

		this._eventList = this._eventList.filter(s => {
			if (front < s.v) {
				return true;
			}
			if (s.v < rear) {
				return false;
			}
			s.isFront = rear < s.v;
			s.x = s.v * bw;
			// console.log('Stage#scanEvent op:' + s.op + '/num:' + s.number);
			// console.log('gx:' + gx + 'front:' + front + '/s.v:' + s.v);
			let evt = this.executeEvent(s);
			if (evt) {
				if (evt instanceof Actor) {
					result.push(evt);
				}
				return false;
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
				return true;
			}
			// spawn
			let x = gx + (isFront ? this._product.width + bw * 1.5 : 16);
			let y = (s.h + 1) * bw;
			// let reserve = Enemy.assign(s.number, x, y);
			let reserve = this.getActor(s.number, x, y);

			if (reserve != null) {
				reserve.belongings = s.belongings;
				// console.log('reserve:' + reserve.className);
				// console.log(reserve);
				// let enemy;

				// if (reserve.formation) {
				// 	enemy = new Formation(reserve.x, reserve.y).setup(reserve.type, 8);
				// } else {
				// 	enemy = new reserve.type(reserve.x, reserve.y);
				// }
				let clazz = null;

				try {
					clazz = eval(reserve.className);
				} catch (e) {
					// nop
				}
				if (clazz) {
					let enemy = new clazz(x, y);

					if (!isFront) enemy.dir = 0;
					enemy._stage = this;
					result.push(enemy);
					return false;
				}
			}
			if (!isFront) reserve.dir = 0;
			result.push(reserve);
			return false;
		});
		this.lastScan = rear;
		return result;
	}

	executeEvent(rec) {
		let op = rec.op;

		if (op == 'Ent') {
			let ship = this.performersList.find(a => a instanceof Ship)

			this.phase = Stage.PHASE.NORMAL;
			this.checkPoint.enter({ x: rec.x, y: 104 });
			if (ship) {
				return true;
			}
			return this.checkPoint.retrieve();
		}
		if (op == 'Ckp' && !rec.isFront) {
			this.checkPoint.update();
			return true;
		}
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
			this._product.effector.start(op);
			return true;
		}
		if (op == 'Afa') {
			AudioMixer.INSTANCE.fade();
			return true;
		}
		if (op == 'Apl') {
			this._product._mediaset.playBgm(rec.number);
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
		this.performersList.forEach(actor => {
			actor.x += this.map._mainVisual.x;
			actor.y += this.map._mainVisual.y;
		});
		this.performersList = this.performersList.filter(actor => !(actor instanceof MapVisual));
		return this.performersList;
	}

	move() {
		this.scanEvent().forEach(enemy => this.performersList.push(enemy));
		this.performersList.sort((a, b) => a.z - b.z);
		if (this.scroll == Stage.SCROLL.STOP) {
			return;
		}
		let mainVisual = this.map._mainVisual;
		let max = this.length

		this.scrollV();
		this.map.setProgress(this.progress++);
		if (max < -mainVisual.x) {
			console.log('Stage#move over:' + -mainVisual.x + '/max:' + max);
			this.performersList.forEach(a => a.x += mainVisual.x);
			//this.phase = Stage.PHASE.NEXT_STAGE;
			this.progress = this.startProgress;
			this.map.setProgress(this.progress);
		}
	}

	draw(ctx) {
		Transition.Instance.draw();
		this.performersList.forEach(actor => actor.draw(ctx));
	}

	createFieldMap() {
		return FieldMap.create(this.map);
	}

	reset(phase = Stage.PHASE.INIT) {
		console.log('Stage#reset:' + phase);
		this.phase = phase;
		this.hibernate = this._product.maxHibernate;
		this.scroll = this.roll;
		this.effectH = 0;
		this.effectV = 0;
		this.map.reset();
		this.map.setProgress(this.progress);
		this._eventList = this.scenarioList.concat();
		this.performersList = this.performersList.filter(actor => actor instanceof MapVisual);
		this._product.effector.reset();
	}

	init() {
		// console.log('Stage#init' + this.id);
		this.map._stage = this;
		this.map._mediaset = this._product._mediaset;
		this.map = this.createFieldMap();
		// console.log('Stage#init map:' + this.map.constructor.name);
		this.scenarioList = this.scenarioList.map(s => Scenario.create(s, this));
		this.progress = this.startProgress;
		this.reset();
		this.checkPoint = new CheckPoint(this);
		return this;
	}

	static create(rec, product) {
		return Object.assign(new Stage(), rec, { _product: product }).init();
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
	INIT: 0,
	NORMAL: 1,
	BOSS: 2,
	NEXT_STAGE: 3,
};
//Stage.VIEWS = ['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'];

class CheckPoint {
	constructor(stage) {
		this._stage = stage;
		this.dx = 0;
		this.dy = 0;
		this.update();
	}

	enter(pos) {
		this.update();
		this.dx = pos.x - this.x;
		this.dy = pos.y - this.y;
	}

	update() {
		this.progress = this._stage.progress;
		this.x = -this._stage.map._mainVisual.x;
		this.y = 100;
		console.log('CheckPoint#update progress:' + this.progress);
	}

	retrieve() {
		let ship = new Ship(this.x + this.dx, this.y + this.dy);

		this._stage.progress = this.progress;
		this._stage.map.setProgress(this.progress);
		ship._stage = this._stage;
		return ship;
	}
}

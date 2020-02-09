class Stage {
	constructor() {
		this.foreground = null;
		this.bgm = null;
		this.boss = null;
		this.checkPoint = Stage.CHECK_POINT[0];
		this.viewDic = {};
		this.effectH = 0;
		this.effectV = 0;
		this.progress = 0;
		this._eventList = [];
		this.lastScan = null;
		this.performersList = [];
	}

	get isMoving() {
		return this.phase == Stage.PHASE.NORMAL;
	}

	playBgm() {
		let audio = Mediaset.Instance.getAudio(this.startAudioType, this.startAudioSeq);

		if (audio) {
			// console.log('Stage#playBgm:');
			// console.log(audio);
			AudioMixer.INSTANCE.play(audio.id, .7, true);
		}
	}

	get fg() {
		if (!this.foreground) {
			this.foreground = this.map._mainVisual;
		}
		return this.foreground;
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

	changeRoll(roll) {
		this.roll = roll;
		this.scroll = roll;
		this.map._mainVisual.pattern = null;
	}

	start() {
console.log('Stage#start');
		this.performersList.forEach(actor => {
			actor.x += this.map.x;
			actor.y += this.map.y;
			actor._stage = this;
		});
		// Add MapVisual
		this.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	reset() {
console.log('Stage#reset');
		this.checkPoint = Stage.CHECK_POINT[0];
		this.retry();
	}

	retry() {
console.log('Stage#retry!');
		this.phase = Stage.PHASE.NORMAL;
		this.progress = -this._product.width / this.map._mainVisual.speed;
		this.hibernate = this._product.maxHibernate;

		this.scroll = this.scrollSv;
		this.effectH = 0;
		this.effectV = 0;
		this.map.reset();
		this.map.setProgress(this.progress);
		this._eventList = this.scenarioList.concat();
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
			target.x -= Math.cos(mainVisual.radian) * mainVisual.speed;
		}
		if (target.effectV) {
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
		let rear = Math.round(gx / this.map.brickSize);

		if (rear == this.lastScan) {
			return result;
		}
		//
		let front = Math.round((gx + this._product.width) / this.map.brickSize);
		let newList = [];

		this._eventList.forEach(rec => {
			let spawn = false;
			let isFront = rec.op == 'Spw';

			if (isFront) {
				if (rec.v < front) {
					return;
				}
				if (rec.v == front) {
					spawn = true;
				}
			} else if (rec.op == 'Rev') {
				if (rec.v < rear) {
					return;
				}
				if (rec.v == rear) {
					spawn = true;
				}
			}
			if (!spawn) {
				newList.push(rec);
				return;
			}
			// spawn
			let x = gx + (isFront ? this._product.width + this.map.brickSize * 1.5 : 0);
			let y = (rec.h + 1) * this.map.brickSize;
			let reserve = Enemy.assign(rec.number, x, y);

			if (reserve != null) {
				let enemy;

				if (reserve.formation) {
					enemy = new Formation(reserve.x, reserve.y).setup(reserve.type, 8);
				} else {
					enemy = new reserve.type(reserve.x, reserve.y);
				}
				enemy._stage = this;
				result.push(enemy);
			}
		});
		this._eventList = newList;
		this.lastScan = rear;
		return result;
	}

	forward() {
		this.map.setProgress(this.progress++);
		let fgX = this.fg.x;

		Stage.CHECK_POINT.forEach(cp => {
			if (cp.x <= fgX && this.checkPoint.x < fgX) {
				this.checkPoint = cp;
			}
		});
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

	toBossMode() {
		this.phase = Stage.PHASE.BOSS;
		if (this.boss) {
			AudioMixer.INSTANCE.play(this.boss, .7, true);
		}
//		if (this.scroll == Stage.SCROLL.LOOP) {
//			this.scroll = Stage.SCROLL.ON;
//		}
	}

	removeMapVisual() {
		this.performersList = this.performersList.filter(actor => !(actor instanceof MapVisual));
		this.performersList.forEach(actor => {
			actor.x -= this.map.x;
			actor.y -= this.map.y;
		});
		return this.performersList;
	}

	move() {
		this.scanEvent().forEach(enemy => this.performersList.push(enemy));
		this.performersList.sort((a, b) => a.z - b.z);
	}

	draw(ctx) {
		Transition.Instance.draw();
		this.performersList.forEach(actor => actor.draw(ctx));
	}

	createFieldMap() {
		return FieldMap.create(this.map);
	}

	init() {
		this.scroll = this.roll;
		this.scrollSv = this.roll;
		this.map = this.createFieldMap();
		this.map._stage = this;
this.boss = this.map.boss; // TODO: remove
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
	BOTTOM: 8
};
Stage.PHASE = {
	NORMAL: 0,
	BOSS: 1
};
Stage.VIEWS = ['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'];
Stage.CHECK_POINT = [{x:0, y:0}, {x:660, y:0}, {x:1440, y:0}];

class Stage {
	constructor() {
		this.viewDic = {};
		this.lastScan = null;
		this.performersList = [];
	}

	get isMoving() {
		return this.scroll != Stage.SCROLL.STOP;
	}

	get length() {
		return this.map._mainVisual.image.width * this.repeat;
	}

	get isLoop() {
		return this.scroll == Stage.SCROLL.LOOP;
	}

	get margin() {
		let hasMargin = this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;

		if (this.isVertical) {
			return { left: this._product.width, top: 0 };
		}
		return { left: this._product.hW * this.posV, top: hasMargin ? this._product.height : 0 };
	}

	get startProgress() {
		// ToDo startProgress の計算方法
		return -this.margin.left / this.map._mainVisual.speed;
	}

	get front() {
		return this.rear + this._product.width;
	}

	get rear() {
		return parseInt(-this.map._mainVisual.x);
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
			let margin = this.margin;

			this.performersList.forEach(a => {
				a.x -= margin.left;
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
		if (this._product.crashBgm != Product.CrashHandling.Bgm.Keep) {
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
		let fg = this.map._mainVisual;

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
		let mainVisual = this.map._mainVisual;

		if (target instanceof MapVisual) {
			return;
		}
		if (this.isMoving) {
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
		}
		if (this._product.effector.isBrickVisible || !(target instanceof Ship)) {
			this.map.checkHit(target);
		}
	}

	effectMap(ship) {
		let fg = this.map._mainVisual;
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
		let rear = this.rear;

		if (rear == this.lastScan) {
			return result;
		}
		this.lastScan = rear;
		//
		let front = this.front;
		let ship = this.performersList.find(a => a instanceof Ship)

		this._eventList = this._eventList.filter(s => {
			if (front < s.v) {
				return true;
			}
			if (s.v < rear) {
				// console.log('Stage#scanEvent drop:' + s.op);
				// console.log(s);
				return false;
			}
			s.isFront = rear < s.v;
			// console.log('Stage#scanEvent op:' + s.op + '/num:' + s.number);
			// console.log('front:' + front + '/s.v:' + s.v);
			let evt = this.executeEvent(s);
			if (evt) {
				if (evt instanceof Actor) {
					result.push(evt);
				}
				return false;
			}
			if (!(s.op == 'Spw' && s.v <= front || s.op == 'Rev' && s.v <= rear)) {
				return true;
			}
			// spawn
			let reserve = s.assignActor();

			if (reserve instanceof Ship) {
				this.checkPoint.enter(s);
				this.phase = Stage.PHASE.NORMAL;
				if (ship) {
					return false;
				}
			} else {
				try {
					let clazz = eval(reserve.className);

					// console.log('supplies:' + reserve.className);
					reserve = new clazz(s.x, s.y);
					reserve.belongings = s._belongings;
					reserve._stage = this;
				} catch (e) {
					// nop
				}
			}
			if (s.op == 'Rev') {
				reserve.dir += Math.PI;
				// console.log('dir:' + (reserve.dir / Math.PI * 180));
			}
			if (this._groupMap[s.groupId]) {
				this._groupMap[s.groupId].add(reserve);
			}
			result.push(reserve);
			return false;
		});
		return result;
	}

	executeEvent(rec) {
		let op = rec.op;

		if (op == 'Ent') {
			let ship = this.performersList.find(a => a instanceof Ship)

			// this.phase = Stage.PHASE.NORMAL;
			// this.checkPoint.enter({ x: rec.x, y: 104 });
			// if (ship) {
			// 	return true;
			// }
			// return this.checkPoint.retrieve();
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
		if (op == 'Frm') {
			let group = rec.assign();

			this._groupMap[rec.groupId] = group;
			return group;
		}
		return false;
	}

	notice() {
		if (this.scroll != Stage.SCROLL.ON && this.scroll != Stage.SCROLL.LOOP) {
			return;
		}
		let fg = this.map._mainVisual;

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

	calclatePositions() {}

	move() {
		this.calclatePositions();
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

	drawGuide(ctx) {
		this.scenarioList.forEach(s => {
			let x = this.isVertical ? s.h : s.v;
			let y = this.isVertical ? s.v : s.h;

			ctx.strokeStyle = 'tomato';
			ctx.beginPath();
			ctx.arc(x, y, 4, 0, Math.PI2);
			ctx.stroke();
		});
	}

	draw(ctx) {
		Transition.Instance.draw();
		this.performersList.forEach(actor => actor.draw(ctx));
		if (this._product.debugMode) {
			this.drawGuide(ctx);
		}
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
		this._eventList = this.scenarioList.map(s => Scenario.create(s, this));
		this._groupMap = {};
		this.performersList = this.performersList.filter(actor => actor instanceof MapVisual);
		this._product.effector.reset();
	}

	initGroupDict() {
		let groupDict = {};

		this.scenarioList.forEach(s => {
			s.count = 0;
			if (s.op == 'Frm') {
				groupDict[s.groupId] = s;
			}
		});
		this.scenarioList.forEach(s => {
			if (s.groupId && s.op != 'Frm') {
				groupDict[s.groupId].count++;
			}
		});
	}

	init() {
		// console.log('Stage#init' + this.id);
		this.map._stage = this;
		this.map._mediaset = this._product._mediaset;
		this.map = this.createFieldMap();
		this._fg = this.map._mainVisual;
		this.width = this.map._mainVisual.image.width;
		this.height = this.map._mainVisual.image.height;
		this.isVertical = this.orientation == 2 || this.orientation == 8;
		this.initGroupDict();
		this.progress = this.startProgress;
		this.reset();
		this.checkPoint = new CheckPoint(this);
		return this;
	}

	static create(rec, product) {
		let clazz = rec.orientation == 2 ? Stage :
			rec.orientation == 4 ? Stage :
				rec.orientation == 6 ? StageGoToTheRight : StageGoUp;

		return Object.assign(new clazz(), rec, { _product: product }).init();
	}
}

class VerticalStage extends Stage {
	constructor() {
		super();
	}

	drawGuide(ctx) {
		let left = this.posH;
		let front = this.front;

		super.drawGuide(ctx);
		ctx.save();
		ctx.lineWidth = 4;
		ctx.strokeStyle = 'rgba(128, 64, 32, .5)';
		ctx.strokeRect(left, front, this._product.width, this._product.height);
		ctx.fillText(left + ',' + front, left, front + 8);
		ctx.restore();
	}
}

class StageGoUp extends VerticalStage {
	constructor() {
		super();
		console.log('StageGoUp#constructor');
	}

	get startProgress() {
		console.log('StageGoUp#startProgress');
		return 0;//this.height / this.map._mainVisual.speed;
	}

	get front() {
		return parseInt(-this.map._mainVisual.y);
	}

	get rear() {
		return this.front + this._product.height;
	}

	scanEvent() {
		let result = [];
		let rear = this.rear;

		if (rear == this.lastScan) {
			return result;
		}
		this.lastScan = rear;
		//
		let front = this.front;
		let ship = this.performersList.find(a => a instanceof Ship)

		this._eventList = this._eventList.filter(s => {
			if (front < s.v) {
				return true;
			}
			if (s.v < rear) {
				console.log('Stage#scanEvent drop:' + s.op);
				console.log(s);
				return false;
			}
			s.isFront = rear < s.v;
			// console.log('Stage#scanEvent op:' + s.op + '/num:' + s.number);
			// console.log('front:' + front + '/s.v:' + s.v);
			let evt = this.executeEvent(s);
			if (evt) {
				if (evt instanceof Actor) {
					result.push(evt);
				}
				return false;
			}
			if (!(s.op == 'Spw' && s.v <= front || s.op == 'Rev' && s.v <= rear)) {
				return true;
			}
			// spawn
			let reserve = s.assignActor();

			if (reserve instanceof Ship) {
				this.checkPoint.enter(s);
				this.phase = Stage.PHASE.NORMAL;
				if (ship) {
					return false;
				}
			} else {
				try {
					let clazz = eval(reserve.className);

					// console.log('supplies:' + reserve.className);
					reserve = new clazz(s.x, s.y);
					reserve.belongings = s._belongings;
					reserve._stage = this;
				} catch (e) {
					// nop
				}
			}
			if (s.op == 'Rev') {
				reserve.dir += Math.PI;
				// console.log('dir:' + (reserve.dir / Math.PI * 180));
			}
			if (this._groupMap[s.groupId]) {
				this._groupMap[s.groupId].add(reserve);
			}
			result.push(reserve);
			return false;
		});
		return result;
	}

	drawGuide(ctx) {
		super.drawGuide(ctx);
	}
}

class HorizontalStage extends Stage {
	constructor() {
		super();
	}

	drawGuide(ctx) {
		super.drawGuide(ctx);
		ctx.save();
		ctx.lineWidth = 4;
		ctx.strokeStyle = 'rgba(128, 64, 32, .5)';
		ctx.strokeRect(this.rear, 0, this._product.width, this._product.height);
		ctx.restore();
	}
}

class StageGoToTheRight extends HorizontalStage {
	constructor() {
		super();
		console.log('StageGoToTheRight#constructor');
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
		this.scenario = null;
		this.update();
	}

	enter(scenario) {
		this.update();
		this.scenario = scenario;
	}

	update() {
		this.progress = this._stage.progress;
		this.x = -this._stage.map._mainVisual.x;
		this.y = 100;
		console.log('CheckPoint#update progress:' + this.progress);
	}

	retrieve() {
		console.log('CheckPoint#retrieve*************');
		let player = this.scenario.assignActor();

		this._stage.progress = this.progress;
		this._stage.map.setProgress(this.progress);
		// player._stage = this._stage;
		return player;
	}
}

class StageEditor extends Stage {
	constructor() {
		super();
		this.cursorType = StageEditor.CURSOR_TYPE.EDIT;
		this.pos = {x:0, y:0};
		this._currentScenario = null;
	}

	setProgress(x) {
		if (this.fg.speed == 0) {
			return;
		}
		let progress = x * this.map.brickSize / this.fg.speed;

		this.map.setProgress(progress);
		this.progress = progress;
	}

	onMousedown(pos, scenario) {
		// console.log('StageEditor#onMousedown');
		if (this.cursorType == StageEditor.CURSOR_TYPE.NONE
			|| this.cursorType == StageEditor.CURSOR_TYPE.EDIT) {
			return;
		}
		if (this.cursorType == StageEditor.CURSOR_TYPE.REMOVE) {
			this.removeScenario();
		} else {
			this.addScenario(pos, scenario);
		}
		if (this.cursorType == StageEditor.CURSOR_TYPE.EVENT) {
			this.cursorType = StageEditor.CURSOR_TYPE.NONE;
		}
	}

	onMousemove(pos = { x: Number.MAX_SAFE_INTEGER, y: 0 }, scenario) {
		this._eventList.forEach(s => s.hasFocus = false);
		let act = this._eventList.find(s => s.type == Scenario.Type.Actor && s.includes(pos));

		this.pos = pos;
		if (pos.x == Number.MAX_SAFE_INTEGER) {
			this._reservedScenario = null;
		} else {
			this._reservedScenario = scenario;
		}
		if (!act) {
			let event = this._eventList.find(s => s.type != Scenario.Type.Actor && s.isHit(pos));

			if (event) {
				// console.log('event:');
				// console.log(event);
				this._currentScenario = event;
				return;
			}
			act = this._eventList.find(s => s.type == Scenario.Type.Actor && s.isHit(pos));
		}
		if (act) {
			act.hasFocus = true;
			this._currentScenario = act;
			return;
		}
		this._currentScenario = null;
	}

	removeScenario(scenario = this._currentScenario) {
		if (!scenario) {
			return;
		}
		let op = scenario.op;
		let v = scenario.v;
		let h = scenario.h;

		console.log('StageEditor#removeScenario:');
		console.log(scenario);
		// if (scenario.type == Scenario.Type.Actor) {
		// 	h = 0;
		// }
		this._eventList = this._eventList.filter(s => s.op != op || s.v != v || s.h != h);
	}

	addScenario(pos, rec) {
		let scenario = Scenario.create(rec, this);
		let bw = this.map.brickSize;
		let x = parseInt(pos.x / bw);
		let y = scenario.type == Scenario.Type.Actor ? parseInt(pos.y / bw) : 0;

		scenario.v = x;
		scenario.h = y;
		this.removeScenario(scenario);
		this._eventList.push(scenario);
		console.log('StageEditor#addScenario:');
		console.log(scenario);
	}

	changeRoll(roll) {
		this.roll = roll;
		this.scroll = roll;
		this.map._mainVisual.pattern = null;
	}

	drawCursor(ctx) {
		if (this.cursorType == StageEditor.CURSOR_TYPE.NONE) {
			return;
		}
		let bw = this.map.brickSize;
		let x = parseInt(this.pos.x / bw) * bw;
		// let y = parseInt(this.cursorY / bw) * bw;

		if (this.cursorType == StageEditor.CURSOR_TYPE.ACTOR) {
			let y = parseInt(this.pos.y / bw) * bw;

			if (this._reservedScenario) {
				ctx.save();
				// console.log('this._reservedScenario');
				// console.log(this._reservedScenario);
				ctx.globalAlpha = 0.5;
				this._reservedScenario.v = x / bw;
				this._reservedScenario.h = y / bw;
				this._reservedScenario.draw(ctx);
				ctx.restore();
			}
			ctx.fillStyle = 'rgba(120, 60, 255, .5)';
			ctx.fillRect(x, y, bw, bw);
			return;
		}
		if (this.cursorType == StageEditor.CURSOR_TYPE.EVENT) {
			let y = this.scroll & Stage.SCROLL.LOOP ? 0 : -this._product.height;
			let height = ctx.canvas.height;

			ctx.fillStyle = 'rgba(255, 60, 120, .5)';
			ctx.fillRect(x, y, bw, height);
		}
	}

	draw(ctx) {
		let hasMargin = this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;
		let ty = hasMargin ? Product.Instance.height : 0;

		ctx.save();
		ctx.translate(this.startPos, ty);
		super.draw(ctx);
		this.map.draw(ctx);
		this._eventList.forEach(rec => rec.draw(ctx));
		if (this._currentScenario) {
			this._currentScenario.drawBalloon(ctx, this.pos);
		}
		this.drawCursor(ctx);
		ctx.restore();
	}

	save() {
		console.log('StageEditor#save');
		this.scenarioList = this._eventList.concat();
		return new StageEntity().save(this);
	}

	createFieldMap() {
		return FieldMapEditor.create(this.map);
	}

	static create(rec, product) {
		return Object.assign(new StageEditor(), rec, { _product: product }).init();
	}
}
StageEditor.CURSOR_TYPE = {
	NONE: 0,
	ACTOR: 1,
	EVENT: 2,
	EDIT: 3,
	REMOVE: 4,
}

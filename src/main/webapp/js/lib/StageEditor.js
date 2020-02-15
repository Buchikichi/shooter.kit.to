class StageEditor extends Stage {
	constructor() {
		super();
		this.cursorType = StageEditor.CURSOR_TYPE.NONE;
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

	setCursorPos(pos) {
		this._eventList.forEach(s => s.hasFocus = false);
		let act = this._eventList.find(s => s.target == 'E' && s.includes(pos));

		this.pos = pos;
		if (act) {
			// console.log('act:');
			// console.log(act);
			act.hasFocus = true;
			this._currentScenario = act;
			return;
		}
		//
		let event = this._eventList.find(s => s.target != 'E' && s.isHit(pos));

		if (event) {
			// console.log('event:');
			// console.log(event);
			this._currentScenario = event;
			return;
		}
		this._currentScenario = null;
	}

	addScenario(pos, scenario) {
		let bw = this.map.brickSize;
		let x = parseInt(pos.x / bw);
		let y = scenario.target == 'E' ? parseInt(pos.y / bw) : 0;

		scenario.v = x;
		scenario.h = y;
		scenario._stage = this;
		this._eventList = this._eventList.filter(rec =>
			rec.target == 'E' || rec.v != scenario.v || rec.h != scenario.h);
		this._eventList.push(scenario);
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

		ctx.save();
		if (hasMargin) {
			ctx.translate(0, Product.Instance.height);
		}
		super.draw(ctx);
		this.map.draw(ctx);
		this._eventList.forEach(rec => rec.draw(ctx));
		if (this._currentScenario) {
			this._currentScenario.drawBalloon(ctx, this.pos);
		}
		this.drawCursor(ctx);
		ctx.restore();
	}

	createFieldMap() {
		return FieldMapEditor.create(this.map);
	}

	// init() {
	// 	console.log('StageEditor#init');
	// 	super.init();
	// 	console.log('map:' + this.map.constructor.name);
	// 	return this;
	// }

	save() {
		console.log('StageEditor#save');
		this.scenarioList = this._eventList.concat();
		return new StageEntity().save(this);
	}

	static create(rec) {
		return Object.assign(new StageEditor(), rec).init();
	}
}
StageEditor.CURSOR_TYPE = {
	NONE: 0,
	ACTOR: 1,
	EVENT: 2,
}

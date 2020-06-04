class StageEditor extends Stage {
	constructor() {
		super();
		this.cursorType = StageEditor.CURSOR_TYPE.EDIT;
		this.pos = { x: 0, y: 0 };
		this.grid = 1;
		this._currentScenario = null;
	}

	get editorHeight() {
		if (this.isVertical) {
			return this.height;
		}
		let hasMargin = this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;

		return this.height + (hasMargin ? this._product.height * 2 : 0);
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
			let cur = this.calcCursorPos(pos);
			let y = scenario.type == Scenario.Type.Actor ? cur.y : 0;

			scenario.v = cur.x;
			scenario.h = y;
			this.addScenario(scenario);
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

	addScenario(rec) {
		let scenario = Scenario.create(rec, this);

		this.removeScenario(scenario);
		this._eventList.push(scenario);
		this._eventList.sort((a, b) => a.v == b.v ? a.h - b.h : a.v - b.v);
		console.log('StageEditor#addScenario:');
		console.log(scenario);
	}

	addGroup(scenario) {
		if (!scenario.groupId) {
			return;
		}
		let group = this._eventList.find(s => s.op == 'Frm' && s.groupId == scenario.groupId);

		if (!group) {
			let v = scenario.v;
			let h = Integer.MIN_VALUE;
			// console.log('StageEditor#addGroup groupId:' + scenario.groupId);
			this.addScenario({ v: v, h: h, op: 'Frm', belongings: '0', groupId: scenario.groupId });
		}
	}

	changeRoll(roll) {
		this.roll = roll;
		this.scroll = roll;
		this.map._mainVisual.pattern = null;
	}

	calcCursorPos(pos) {
		let hG = this.grid / 2;

		return {
			x: Math.round((pos.x - hG) / this.grid) * this.grid,
			y: parseInt(pos.y / this.grid) * this.grid,
		};
	}

	drawCursor(ctx) {
		if (this.cursorType == StageEditor.CURSOR_TYPE.NONE) {
			return;
		}
		let bw = this.map.brickSize;
		let cur = this.calcCursorPos(this.pos);

		if (this.cursorType == StageEditor.CURSOR_TYPE.ACTOR) {
			if (this._reservedScenario) {
				ctx.save();
				// console.log('this._reservedScenario');
				// console.log(this._reservedScenario);
				ctx.globalAlpha = 0.7;
				this._reservedScenario.setPos(cur);
				this._reservedScenario.draw(ctx);
				ctx.restore();
			}
			return;
		}
		if (this.cursorType == StageEditor.CURSOR_TYPE.EVENT) {
			let y = this.scroll & Stage.SCROLL.LOOP ? 0 : -this._product.height;
			let height = ctx.canvas.height;

			ctx.fillStyle = 'rgba(255, 60, 120, .5)';
			ctx.fillRect(cur.x, y, bw, height);
		}
	}

	drawVerticalGuide(ctx) {
		let img = this.map._mainVisual.image;
		let left = this.posH - 1;
		let right = left + Product.Instance.width;
		let bottom = img.height + 1;

		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgba(255, 255, 255, .6)';
		ctx.beginPath();
		ctx.moveTo(left, -1);
		ctx.lineTo(left, bottom);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(right, -1);
		ctx.lineTo(right, bottom);
		ctx.stroke();
	}

	drawHorizontalGuide(ctx) {
		let img = this.map._mainVisual.image;
		let x = -this.startPos;
		let height = img.height;
		let width = this.length;

		ctx.lineWidth = 3;
		ctx.strokeStyle = 'rgba(255, 255, 255, .6)';
		ctx.beginPath();
		ctx.moveTo(x, -1);
		ctx.lineTo(width, -1);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(x, height + 1);
		ctx.lineTo(width, height + 1);
		ctx.stroke();
		//
		x = 0;
		ctx.strokeStyle = 'rgba(255, 0, 0, .6)';
		while (x <= width) {
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();
			x += img.width;
		}
		x = this.length - Product.Instance.width;
		ctx.setLineDash([4, 1]);
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();
	}

	drawGuide(ctx) {
		if (!this.hasGuide) {
			return;
		}
		if (this.isVertical) {
			this.drawVerticalGuide(ctx);
			return;
		}
		this.drawHorizontalGuide(ctx);
	}

	draw(ctx) {
		let hasMargin = this.isVertical ? false :
			this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;
		let ty = hasMargin ? Product.Instance.height : 0;

		ctx.save();
		ctx.translate(this.startPos, ty);
		super.draw(ctx);
		this.map.draw(ctx);
		this.drawGuide(ctx);
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

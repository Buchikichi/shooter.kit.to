class StageEditor extends Stage {
	constructor() {
		super();
		this.cursorType = StageEditor.CURSOR_TYPE.EDIT;
		this.pos = StageEditor.UNKNOWN_POS;
		this.grid = 1;
		this._currentScenario = null;
	}

	get editorSize() {
		if (this.isVertical) {
			return { width: this.width, height: this.height };
		}
		let hasMargin = this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;
		let width = this._product.width / 2 * this.posV + this.length;
		let height = this.height + (hasMargin ? this._product.height * 2 : 0);

		return { width: width, height: height };
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
			scenario.cursor = this.calcCursorPos(pos);
			this.addScenario(scenario);
		}
		if (this.cursorType == StageEditor.CURSOR_TYPE.EVENT) {
			this.cursorType = StageEditor.CURSOR_TYPE.NONE;
		}
	}

	onMousemove(pos = StageEditor.UNKNOWN_POS, scenario) {
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
				event.hasFocus = true;
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
		this._eventList = this._eventList.filter(s => {
			// TODO:
			return s.op != op || s.v != v || s.h != h;
		});
	}

	addScenario(rec) {
		let scenario = Scenario.create(rec, this);

		this.removeScenario(scenario);
		this._eventList.push(scenario);
		this._eventList.sort((a, b) => this.isVertical
			? a.h == b.h ? a.v - b.v : a.h - b.h
			: a.v == b.v ? a.h - b.h : a.v - b.v);
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
			y: Math.round((pos.y - hG) / this.grid) * this.grid,
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
			ctx.fillStyle = 'rgba(255, 60, 120, .5)';
			if (this.isVertical) {
				ctx.fillRect(0, cur.y, ctx.canvas.width, this.grid);
				return;
			}
			let y = this.scroll & Stage.SCROLL.LOOP ? 0 : -this._product.height;

			ctx.fillRect(cur.x, y, bw, ctx.canvas.height);
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
		let margin = this.margin;
		let x = -margin.left;
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
		// ctx.strokeStyle = 'tomato';
		// ctx.beginPath();
		// ctx.arc(this.pos.limit.right, this.pos.limit.top, 16, 0, Math.PI2);
		// ctx.stroke();
		// ctx.strokeStyle = 'orange';
		// ctx.beginPath();
		// ctx.arc(0, 0, 16, 0, Math.PI2);
		// ctx.stroke();
		if (this.isVertical) {
			this.drawVerticalGuide(ctx);
			return;
		}
		this.drawHorizontalGuide(ctx);
	}

	draw(ctx) {
		let margin = this.margin;

		ctx.save();
		ctx.translate(margin.left, margin.top);
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
StageEditor.UNKNOWN_POS = { x: 0, y: 0, limit: { left: 0, right: 0, top: 0, bottom: 0 } };
StageEditor.CURSOR_TYPE = {
	NONE: 0,
	ACTOR: 1,
	EVENT: 2,
	EDIT: 3,
	REMOVE: 4,
}

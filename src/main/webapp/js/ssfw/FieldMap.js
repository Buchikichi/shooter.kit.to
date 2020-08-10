/**
 * FieldMap.
 */
class FieldMap extends Matter {
	constructor() {
		super();
		this.progressH = 0;
		this._mainVisual = null;
	}

	get x() {
		return -this._mainVisual.x;
	}

	get y() {
		return -this._mainVisual.y;
	}

	reset() {
		this.progressH = 0;
		this.mapVisualList.forEach(mapVisual => mapVisual.reset());
		this.bricks = new Bricks(this);
	}

	scanFloor(actor) {
		return this.bricks.scanFloor(actor);
	}

	getHorizontalAngle(actor) {
		return this.bricks.getHorizontalAngle(actor);
	}

	checkHit(target) {
		target.walled = this.bricks.isHit(target);
	}

	setProgress(progress) {
		this.mapVisualList.forEach(mapVisual => mapVisual.setProgress(progress));
	}

	addProgressH(delta) {
		let stage = this._stage;

		this.progressH += delta;
		if (stage.scroll == Stage.SCROLL.ON) {
			let h = this._mainVisual.image.height;
			let min = -h + Product.Instance.height;

			if (0 < this.progressH) {
				this.progressH = 0;
				return false;
			}
			if (this.progressH < min) {
				this.progressH = min;
				return false;
			}
		}
		return true;
	}

	/**
	 * Draw for edit.
	 */
	draw(ctx) {
		this.mapVisualList.forEach(mapVisual => mapVisual.draw(ctx));
	}

	init() {
		let visualList = [];

		// console.log('mainSeq:' + this.mainSeq);
		this.mapVisualList.forEach(mapVisual => {
			mapVisual._fieldMap = this;
			mapVisual.isMain = (mapVisual.seq == this.mainSeq);
			mapVisual.z = mapVisual.seq * 10000 - 1;
			let newMapVisual = MapVisual.create(mapVisual);
			if (mapVisual.isMain) {
				this._mainVisual = newMapVisual;
			}
			visualList.push(newMapVisual);
		});
		this.mapVisualList = visualList;
		this.reset();
		return this;
	}

	static create(obj) {
		if ('string' == typeof obj) {
			return new MapEntity().select(obj).then(map => {
				return FieldMap.create(map);
			});
		}
		return Object.assign(new FieldMap(), obj).init();
	}
}

/**
 * MapVisual.
 */
class MapVisual extends Matter {
	constructor() {
		super();
		this.repeat = 0;
		this.radian = 0;
		this.speed = 0;
		this.blink = 0;

		this._img = null;
		this._imgName = null;
		this.isMain = false;
		this.canvas = null;
		this.pattern = null;
		this.alpha = 1;
		this.blinkDir = -1;
// TODO: remove
this.effectH = 0;
this.effectV = 0;
	}

	reset() {
		this.canvas = null;
		this.pattern = null;
	}

	get image() {
		if (!this._img) {
			this._img = this._fieldMap._mediaset.getImage(this);
		}
		return this._img;
	}

	get imageName() {
		if (!this._imgName) {
			this._imgName = this._fieldMap._mediaset.getImageName(this);
		}
		return this._imgName;
	}

	get repeatH() {
		return this.repeat;
	}

	get repeatV() {
		return this.repeat;
	}

	get repetition() {
		return this.repeatH ? (this.repeatV ? 'repeat' : 'repeat-x')
			: (this.repeatV ? 'repeat-y' : 'no-repeat');
	}

	setProgress(progress) {
		let h = this.image.height;
		let map = this._fieldMap;
		let stage = map._stage;
		let speed = this.isMain ? this.speed : this.speed - map._mainVisual.speed;

		this.x = progress * Math.cos(this.radian) * speed;
		this.y = (progress * Math.sin(this.radian) * speed + map.progressH) % h;
		if (!stage) {
			return;
		}
		if (stage.isVertical) {
			this.y -= map._mainVisual.image.height;
		} else {
			if (!this.isMain) {
				if (this.repeat) {
					this.x -= this.image.width * 2;
				}
			}
			if (stage.scroll == Stage.SCROLL.LOOP && 0 < this.y) {
				this.y -= h;
			}
			if ((stage.scroll == Stage.SCROLL.OFF | stage.scroll == Stage.SCROLL.TOP) && 0 < this.y) {
				this.y = 0;
			}
		}
	}

	getPattern(ctx) {
		if (this.canvas == null) {
			this.canvas = document.createElement('canvas');
			this.canvas.width = this.image.width;
			this.canvas.height = this.image.height;
			let ctx2d = this.canvas.getContext('2d');
			ctx2d.drawImage(this.image, 0, 0);

			// ctx2d.lineWidth = 3;
			// ctx2d.strokeStyle = 'rgba(255, 255, 255, .2)';
			// ctx2d.strokeRect(0, 0, this.canvas.width, this.canvas.height);
			// ctx2d.beginPath();
			// ctx2d.moveTo(0, 0);
			// ctx2d.lineTo(this.canvas.width, this.canvas.height);
			// ctx2d.stroke();
			// ctx2d.beginPath();
			// ctx2d.moveTo(0, this.canvas.height);
			// ctx2d.lineTo(this.canvas.width, 0);
			// ctx2d.stroke();
		}
		if (this.pattern == null) {
			console.log(this.imageName + ' repetition:' + this.repetition);
			this.pattern = ctx.createPattern(this.canvas, this.repetition);
		}
		return this.pattern;
	}

	smash(matter) {
		let ctx = this.canvas.getContext('2d');
		let brickSize = this._fieldMap.brickSize;
		let tx = parseInt(matter.x / brickSize) * brickSize;
		let ty = parseInt(matter.y / brickSize) * brickSize;

		//		ctx.fillStyle = 'yellow';
		//		ctx.fillRect(tx, ty, brickSize, brickSize);
		ctx.clearRect(tx, ty, brickSize, brickSize);
		this.pattern = null;
	}

	draw(ctx) {
		let map = this._fieldMap;
		let stage = map._stage;
		let width = Math.max(map._mainVisual.image.width, ctx.canvas.width);
		let height = map._mainVisual.image.height;

		if (this.repeatV) {
			height *= 2;
		}
		ctx.save();
		if (!this.isMain) {
			width += this.image.width;
			ctx.translate(this.x, this.y);
		}
		ctx.globalAlpha = this.alpha;
		if (stage) {
			stage._product.effector.effect(ctx);
		}
		ctx.fillStyle = this.getPattern(ctx);
		ctx.fillRect(0, 0, width, height);
		if (stage && stage._product.debugMode) {
			ctx.lineWidth = 4;
			ctx.strokeStyle = 'rgba(0, 255, 0, .7)';
			ctx.strokeRect(0, 0, width, height);
			this.drawForDebug(ctx);
		}
		ctx.restore();
		if (this.blink) {
			this.alpha += this.blinkDir * this.blink;
			if (this.alpha <= 0.3 || 1.0 <= this.alpha) {
				this.blinkDir *= -1;
			}
		}
	}

	drawForDebug(ctx) {
		let sx = -this.x;
		let sy = this.seq * 10;

		ctx.fillStyle = 'orange';
		ctx.beginPath();
		ctx.arc(sx, sy, 5, 0, Math.PI2);
		ctx.fill();
		ctx.fillStyle = 'pink';
		ctx.beginPath();
		ctx.arc(sx + ctx.canvas.width, sy, 5, 0, Math.PI2);
		ctx.fill();
	}

	init() {
		this.radian = this.deg / 180 * Math.PI;
		return this;
	}

	static create(mapVisual) {
		if (mapVisual.isMain) {
			return Object.assign(new MainVisual(), mapVisual).init();
		}
		return Object.assign(new MapVisual(), mapVisual).init();
	}
}

class MainVisual extends MapVisual {
	constructor() {
		super();
	}

	get repeatV() {
		let stage = this._fieldMap._stage;

		if (stage) {
			let roll = stage.scroll;
			let noRepeatV = roll == Stage.SCROLL.OFF || roll == Stage.SCROLL.ON;

			return !noRepeatV | this.repeat;
		}
		return this.repeat;
	}
}

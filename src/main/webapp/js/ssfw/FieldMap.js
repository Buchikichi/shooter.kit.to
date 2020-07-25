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

	setProgress(progress) {
		let h = this.image.height;
		let stage = this._fieldMap._stage;
		let posH = stage.posH;

		this.x = posH + progress * Math.cos(this.radian) * this.speed;
		this.y = (progress * Math.sin(this.radian) * this.speed + this._fieldMap.progressH) % h;
		if (!stage) {
			return;
		}
		if (stage.scroll == Stage.SCROLL.LOOP && 0 < this.y) {
			this.y -= h;
		}
		if (!stage.isVertical) {
			if ((stage.scroll == Stage.SCROLL.OFF | stage.scroll == Stage.SCROLL.TOP) && 0 < this.y) {
				this.y = 0;
			}
		}
	}

	getPattern(ctx) {
		let sourceImage = this.image;

		if (this.canvas == null) {
			this.canvas = document.createElement('canvas');
			this.canvas.width = sourceImage.width;
			this.canvas.height = sourceImage.height;
			this.canvas.getContext('2d').drawImage(sourceImage, 0, 0);
		}
		if (this.pattern == null) {
			let repetition = 'repeat';
			let stage = this._fieldMap._stage;

			if (this.isMain && stage) {
				let roll = stage.scroll;
				let noRepeatV = roll == Stage.SCROLL.OFF || roll == Stage.SCROLL.ON;

				repetition = noRepeatV ? 'repeat-x' : 'repeat';
			}
// console.log('repetition:' + repetition);
			this.pattern = ctx.createPattern(this.canvas, repetition);
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
		let height = map._mainVisual.image.height;

		ctx.save();
		ctx.translate(this.x + map.x, this.y + map.y);
		ctx.globalAlpha = this.alpha;
		if (map._stage) {
			map._stage._product.effector.effect(ctx);
		}
		ctx.beginPath();
		ctx.fillStyle = this.getPattern(ctx);
		ctx.rect(-this.x, -this.y, ctx.canvas.width, height);
		ctx.fill();
//		this.drawForDebug(ctx);
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
		return Object.assign(new MapVisual(), mapVisual).init();
	}
}

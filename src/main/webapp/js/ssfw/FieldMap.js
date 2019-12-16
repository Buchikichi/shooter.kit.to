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

	migrate() {
		if (0 < this.mapVisualList.length) {
			return;
		}
console.log('FieldMap#migrate');
		let seq = 0;
		let groundList = [
			{id:this.bg1, radian:this.bg1dir, speed:this.bg1speed, blink:this.bg1blink},
			{id:this.bg2, radian:this.bg2dir, speed:this.bg2speed, blink:this.bg2blink},
			{id:this.bg3, radian:this.bg3dir, speed:this.bg3speed, blink:this.bg3blink},
			{id:this.fg1, radian:this.fg1dir, speed:this.fg1speed, blink:this.fg1blink},
			{id:this.fg2, radian:this.fg2dir, speed:this.fg2speed, blink:this.fg2blink},
			{id:this.fg3, radian:this.fg3dir, speed:this.fg3speed, blink:this.fg3blink},
		];

		groundList.forEach(ground => {
			if (ground.id != null && 0 < ground.id.length) {
				let visual = Mediaset.Instance.getVisual(ground.id);

				if (ground.id == this.fg1) {
					this.mainSeq = seq;
				}
				this.mapVisualList.push(Object.assign(ground, visual, {seq:seq++}));
			}
		});
console.log('this.mapVisualList:' + this.mapVisualList.length);
console.log('this.mainSeq:' + this.mainSeq);
	}

	init() {
		let visualList = [];

		this.migrate();
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
			this._img = Mediaset.Instance.getImage(this);
		}
		return this._img;
	}

	get imageName() {
		if (!this._imgName) {
			this._imgName = Mediaset.Instance.getImageName(this);
		}
		return this._imgName;
	}

	setProgress(progress) {
		let h = this.image.height;
		let stage = this._fieldMap._stage;

		this.x = progress * Math.cos(this.radian) * this.speed;
		this.y = (progress * Math.sin(this.radian) * this.speed + this._fieldMap.progressH) % h;
		if (!stage) {
			return;
		}
		if (stage.scroll == Stage.SCROLL.LOOP && 0 < this.y) {
			this.y -= h;
		}
		if ((stage.scroll == Stage.SCROLL.OFF | stage.scroll == Stage.SCROLL.TOP) && 0 < this.y) {
			this.y = 0;
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

			if (this.isMain) {
				let roll = this._fieldMap._stage.scroll;
				let noRepeatV = roll == Stage.SCROLL.OFF || roll == Stage.SCROLL.ON;

				repetition = noRepeatV ? 'repeat-x' : 'repeat';
			}
console.log('repetition:' + repetition);
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
		ctx.save();
		ctx.translate(this.x + this._fieldMap.x, this.y + this._fieldMap.y);
		ctx.globalAlpha = this.alpha;
		ctx.beginPath();
		ctx.fillStyle = this.getPattern(ctx);
		ctx.rect(-this.x, -this.y, ctx.canvas.width, ctx.canvas.height);
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

	static create(mapVisual) {
		return Object.assign(new MapVisual(), mapVisual);
	}
}

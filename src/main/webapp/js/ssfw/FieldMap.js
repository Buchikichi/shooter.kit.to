/**
 * FieldMap.
 */
class FieldMap extends Matter {
	constructor() {
		super();
		this._mainVisual = null;
	}

	get x() {
		return -this._mainVisual.x;
	}

	get y() {
		return -this._mainVisual.y;
	}

	resetBricks() {
		let img = new Image();

		img.onload = ()=> {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			this.bricks = ctx.getImageData(0, 0, img.width, img.height);
		};
		img.src = this.map;
	}

	setProgress(progress) {
		this.mapVisualList.forEach(mapVisual => {
			mapVisual.setProgress(progress);
		});
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
		let countBG = 0;

		this.migrate();
		this.resetBricks();
		this.mapVisualList.forEach((mapVisual, ix) => {
			if (mapVisual.visualType == Visual.TYPE.Background) {
				countBG++;
			}
			mapVisual.map = this;
			mapVisual.isMain = (ix == this.mainSeq);
			visualList.push(MapVisual.create(mapVisual));
		});
		this.mapVisualList = visualList;
		this._mainVisual = this.mapVisualList[this.mainSeq];
		//
		let z = -10000 * (countBG - 1) - 1;

		this.mapVisualList.forEach(mapVisual => {
			mapVisual.z = z;
			z += 10000;
		});
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
		this.isMain = false;
		this.pattern = null;
		this.alpha = 1;
		this.blinkDir = -1;
// TODO: remove
this.effectH = 0;
this.effectV = 0;
	}

	get image() {
		return Mediaset.Instance.getImage(this);
	}

	setProgress(progress) {
		this.x = progress * Math.cos(this.radian) * this.speed;
		this.y = progress * Math.sin(this.radian) * this.speed;
	}

	getPattern(ctx) {
		if (this.pattern == null) {
			this.pattern = ctx.createPattern(this.image, 'repeat');
		}
		return this.pattern;
	}

	draw(ctx) {
		ctx.save();
		ctx.translate(this.x + this.map.x, this.y + this.map.y);
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

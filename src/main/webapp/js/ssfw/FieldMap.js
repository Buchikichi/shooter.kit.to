/**
 * FieldMap.
 */
class FieldMap extends Matter {
	constructor() {
		super();
	}

	get mainVisual() {
		return this.mapVisualList[this.mainSeq];
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

	setProgress(progress, isEdit = false) {
		this.mapVisualList.forEach(mapVisual => {
			mapVisual.setProgress(progress);
		});
		if (isEdit) {
			let mainX = this.mainVisual.x;
			let mainY = this.mainVisual.y;

			this.mapVisualList.forEach(mapVisual => {
				mapVisual.x -= mainX;
				mapVisual.y += mainY;
			});
		}
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
		this.mapVisualList.forEach(mapVisual => {
			if (mapVisual.visualType == Visual.TYPE.Background) {
				countBG++;
			}
			visualList.push(MapVisual.create(mapVisual));
		});
		this.mapVisualList = visualList;
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
		this.x = progress * Math.cos(this.dir) * this.speed;
		this.y = progress * Math.sin(this.dir) * this.speed;
	}

	getPattern(ctx) {
		if (this.pattern == null) {
			this.pattern = ctx.createPattern(this.image, 'repeat');
		}
		return this.pattern;
	}

	draw(ctx) {
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.translate(-this.x, -this.y);
		ctx.beginPath();
		ctx.fillStyle = this.getPattern(ctx);
		ctx.rect(this.x, this.y, ctx.canvas.width, ctx.canvas.height);
		ctx.fill();
		ctx.restore();
		if (this.blink) {
			this.alpha += this.blinkDir * this.blink;
			if (this.alpha <= 0.3 || 1.0 <= this.alpha) {
				this.blinkDir *= -1;
			}
		}
	}

	static create(mapVisual) {
		return Object.assign(new MapVisual(), mapVisual);
	}
}

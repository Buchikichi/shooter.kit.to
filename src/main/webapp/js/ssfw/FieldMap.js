/**
 * FieldMap.
 */
class FieldMap extends Matter {
	constructor() {
		super();
		this.visualList = [];
	}

	get mainVisual() {
		return this.visualList[this.mainSeq];
	}

	migrate() {
		if (0 < this.mapVisualList.length) {
			return;
		}
console.log('migrate()');
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

	init() {
		this.migrate();
		this.resetBricks();
		this.mapVisualList.forEach(mapVisual => {
			this.visualList.push(Object.assign(new MapVisual(), mapVisual));
		});
		return this;
	}

	draw(ctx) {
		this.visualList.forEach(mapVisual => mapVisual.draw(ctx));
	}

	static create(mapId) {
		return new MapEntity().select(mapId).then(map => {
			return Object.assign(new FieldMap(), map).init();
		});
	}
}

/**
 * MapVisual.
 */
class MapVisual extends Matter {
	constructor() {
		super();
		this.pattern = null;
	}

	get image() {
		return Mediaset.Instance.getImage(this);
	}

	getPattern(ctx) {
		if (this.pattern == null) {
			this.pattern = ctx.createPattern(this.image, 'repeat');
		}
		return this.pattern;
	}

	draw(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.getPattern(ctx);
		ctx.rect(0, 0, ctx.width, ctx.height);
		ctx.fill();
		ctx.restore();
	}
}

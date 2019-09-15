/**
 * FieldMap.
 */
class FieldMap extends Matter {
	constructor() {
		super();
		this.map = null;
		this.mapVisualList = [];
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
		img.src = this.map.map;
	}

	load(mapId) {
		return new MapEntity().select(mapId).then(map => {
			this.map = map;
			this.resetBricks();
			if (map.mapVisualList.length == 0) {
				let groundList = [
					{id:map.bg1, radian:map.bg1dir, speed:map.bg1speed, blink:map.bg1blink},
					{id:map.bg2, radian:map.bg2dir, speed:map.bg2speed, blink:map.bg2blink},
					{id:map.bg3, radian:map.bg3dir, speed:map.bg3speed, blink:map.bg3blink},
					{id:map.fg1, radian:map.fg1dir, speed:map.fg1speed, blink:map.fg1blink},
					{id:map.fg2, radian:map.fg2dir, speed:map.fg2speed, blink:map.fg2blink},
					{id:map.fg3, radian:map.fg3dir, speed:map.fg3speed, blink:map.fg3blink},
				];
				let seq = 0;

				groundList.forEach(ground => {
					if (ground.id != null && 0 < ground.id.length) {
						let visual = Mediaset.Instance.getVisual(ground.id);

						this.mapVisualList.push(Object.assign(ground, visual, {seq:seq++}));
					}
				});
			}
			map.mapVisualList.forEach(mapVisual => {
				this.mapVisualList.push(Object.assign(new MapVisual(), mapVisual));
			});
		});
	}

	draw(ctx) {
		this.mapVisualList.forEach(mapVisual => mapVisual.draw(ctx));
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

	getPattern(ctx) {
		if (this.pattern == null) {
			let img = Mediaset.Instance.getImage(this);

			this.pattern = ctx.createPattern(img, 'repeat');
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

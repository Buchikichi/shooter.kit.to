/**
 * FieldMapEditor.
 */
class FieldMapEditor extends FieldMap {
	constructor() {
		super();
		this.col = 0;
		this.colDir = 1;
		this.currentBrick = null;
		this.scale = 1;
		this.progress = 0;
	}

	touch(x, y, num) {
		let ix = this.bricks.getIndex({x:x, y:y});
		let brick = this.bricks.bricks.data;
		let lastNum = brick[ix + 2];

		if (this.currentBrick != null) {
			this.bricks.putBrick(ix, this.currentBrick);
			return;
		}
		if (lastNum == num) {
			this.currentBrick = 0;
		} else {
			this.currentBrick = num;
		}
		this.bricks.putBrick(ix, this.currentBrick);
	}

	leave() {
		this.currentBrick = null;
	}

	setProgress(progress) {
		super.setProgress(progress);
		this._mainVisual.x = 0;
		this._mainVisual.y = 0;
		this.progress = progress;
	}

	draw(ctx) {
		super.draw(ctx);
		this.bricks.draw(ctx);
		this.col += this.colDir * 4;
		if (this.col <= 0 || 255 <= this.col) {
			this.colDir *= -1;
		}
//		this.drawForDebug(ctx);
	}

	drawForDebug(ctx) {
		let x = this.progress / this.scale;
		let y = 0;

		ctx.save();
		ctx.strokeStyle = 'white';
		ctx.strokeText('x:' + this.x + '/' + this.y, x, 20);
		ctx.restore();
	}

	save() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let bricks = this.bricks.bricks;

		canvas.width = bricks.width;
		canvas.height = bricks.height;
		ctx.putImageData(bricks, 0, 0);
		this.map = canvas.toDataURL('image/png');
		return new MapEntity().save(this);
	}

	static create(mapId) {
		return new MapEntity().select(mapId).then(map => {
			return Object.assign(new FieldMapEditor(), map).init();
		});
	}
}

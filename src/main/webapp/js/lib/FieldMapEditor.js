/**
 * FieldMapEditor.
 */
class FieldMapEditor extends FieldMap {
	constructor() {
		super();
		this.brickColor = 'b';
		this.col = 0;
		this.colDir = 1;
		this.currentBrick = null;
		this.scale = 1;
		this.progress = 0;
	}

	getImageData() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');
		let img = this._mainVisual.image;

		canvas.width = img.width;
		canvas.height = img.height;
		ctx.drawImage(img, 0, 0);
		return ctx.getImageData(0, 0, img.width, img.height);
	}

	generateBrick(ctx) {
		let img = this.getImageData();
		let brickSize = this.brickSize;
		let brickHalf = brickSize / 2;
		let steps = brickSize * 4;
		let bricks = this.bricks.bricks;
		let sx = (img.width * brickHalf + brickHalf) * 4;
		let ix = 0;

		console.log('img width:' + img.width + '/height:' + img.height);
		console.log('bricks width:' + bricks.width + '/height:' + bricks.height);
		for (let by = 0; by < bricks.height; by++) {
			for (let bx = 0; bx < bricks.width; bx++, ix += 4, sx += steps) {
				let dot = false;

				for (let c = 0; c < 4; c++) {
					if (img.data[sx + c]) {
						dot = true;
					}
				}
				let val = dot ? Bricks.BRICK_TYPE.WALL : 0;

				this.bricks.putBrick(ix, val);
			}
			sx += img.width * (brickSize - 1) * 4;
		}
console.log('ix:' + ix);
console.log('sx:' + sx);
	}

	clear() {
		this.bricks.clear(this);
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

	drawGuide(ctx) {
		if (!this._stage || !this._stage.hasGuide) {
			return;
		}
		let img = this._mainVisual.image;
		let x = -this._stage.startPos;
		let height = img.height;
		let width = this._stage.length;

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
		x = this._stage.length - Product.Instance.width;
		ctx.setLineDash([4, 1]);
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();
	}

	draw(ctx) {
		super.draw(ctx);
		ctx.save();
		if (this.brickColor == 'b') {
			ctx.strokeStyle = 'rgba(255, 255, 255, .7)';
			ctx.fillStyle = 'rgba(0, 0, 0, .5)';
		} else if (this.brickColor == 'w') {
			ctx.strokeStyle = 'rgba(0, 0, 0, .7)';
			ctx.fillStyle = 'rgba(255, 255, 255, .5)';
		}
		if (this.brickColor != '-') {
			this.bricks.draw(ctx);
		}
		this.drawGuide(ctx);
		ctx.restore();
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

	static create(obj, callback = null) {
		if ('string' == typeof obj) {
			return new MapEntity().select(obj).then(map => {
				return FieldMapEditor.create(map, callback);
			});
		}
		let fieldMapEditor = Object.assign(new FieldMapEditor(), obj);

		if (callback == null) {
			return fieldMapEditor.init();
		}
		return Mediaset.create(fieldMapEditor.mediasetId).then(mediaset => {
			fieldMapEditor._mediaset = mediaset.loadVisual();
			return fieldMapEditor._mediaset.checkLoading(callback);
		}).then(() => {
			return fieldMapEditor.init();
		});
	}
}

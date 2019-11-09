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
		let bx = parseInt(x / this.brickSize);
		let by = parseInt(y / this.brickSize);
		let ix = by * this.bricks.width * 4 + bx * 4;
		let brick = this.bricks.data;
		let lastNum = brick[ix + 2];

//console.log(lastNum + '/' + num);
		if (this.currentBrick != null) {
			brick[ix + 2] = this.currentBrick;
			return;
		}
		if (lastNum == num) {
			this.currentBrick = 0;
		} else {
			this.currentBrick = num;
		}
		brick[ix + 2] = this.currentBrick;
	}

	leave() {
		this.currentBrick = null;
	}

	setProgress(progress) {
		super.setProgress(progress);
		let mainX = this._mainVisual.x;
		let mainY = this._mainVisual.y;

		this.mapVisualList.forEach(mapVisual => {
			mapVisual.x -= mainX;
			mapVisual.y += mainY;
		});
		this.progress = progress;
	}

	drawBricks(ctx) {
		let bw = this.bricks.width * 4;
		let brick = this.bricks.data;
		let brickWidth = this.brickSize * .9;
		let halfBrick = this.brickSize / 2;
		let col = this.col;
		let rev = 256 - this.col;
		let minLeft = this.progress / this.scale - this.brickSize;

		ctx.save();
		ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
		ctx.fillStyle = 'rgba(0, 0, 0, .3)';
		for (let y = 0; y < this.bricks.height; y++) {
			let ix = y * bw;
			let top = y * this.brickSize;

			for (let x = 0; x < bw; x++, ix += 4) {
				let left = x * this.brickSize;
				let brickNum = brick[ix + 2];

				if (left < minLeft) {
					continue;
				}
				if (brickNum == 254) {
					let ax = left + halfBrick;
					let ay = top + halfBrick;
	
					ctx.beginPath();
					ctx.arc(ax, ay, brickWidth / 2, 0, Math.PI2, false);
					ctx.fill();
					ctx.stroke();
//					ctx.strokeRect(left, top, brickWidth, brickWidth);
				} else if (0 < brickNum) {
					ctx.fillRect(left, top, brickWidth, brickWidth);
					ctx.strokeRect(left, top, brickWidth, brickWidth);
				}
			}
		}
		ctx.restore();
	}

	draw(ctx) {
		super.draw(ctx);
		this.drawBricks(ctx);
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
		ctx.strokeText('x:' + x, x, 20);
		ctx.restore();
	}

	save() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.bricks.width;
		canvas.height = this.bricks.height;
		ctx.putImageData(this.bricks, 0, 0);
		this.map = canvas.toDataURL('image/png');
		return new MapEntity().save(this);
	}

	static create(mapId) {
		return new MapEntity().select(mapId).then(map => {
			return Object.assign(new FieldMapEditor(), map).init();
		});
	}
}

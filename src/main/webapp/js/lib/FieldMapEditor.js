/**
 * FieldMapEditor.
 */
class FieldMapEditor extends FieldMap {
	constructor() {
		super();
		this.col = 0;
		this.colDir = 1;
		this.currentBrick = null;
	}

	get mapImage() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.bricks.width;
		canvas.height = this.bricks.height;
		ctx.putImageData(this.bricks, 0, 0);
		return canvas.toDataURL('image/png');
	}

	get formData() {
		let formData = new FormData();

		formData.append('id', this.id);
		formData.append('name', this.name);
		formData.append('map', this.mapImage);
		formData.append('brickSize', this.brickSize);
		formData.append('mainSeq', this.mainSeq);
		this.visualList.forEach(mapVisual => {
			let prefix = 'mapVisualList[' + mapVisual.seq + '].';

			formData.append(prefix + 'seq', mapVisual.seq);
			formData.append(prefix + 'visualType', mapVisual.visualType);
			formData.append(prefix + 'visualSeq', mapVisual.visualSeq);
			formData.append(prefix + 'x', mapVisual.x);
			formData.append(prefix + 'y', mapVisual.y);
			formData.append(prefix + 'radian', mapVisual.radian);
			formData.append(prefix + 'speed', mapVisual.speed);
			formData.append(prefix + 'blink', mapVisual.blink);
		});
		return formData;
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

	drawBricks(ctx) {
		let bw = this.bricks.width * 4;
		let brick = this.bricks.data;
		let brickWidth = this.brickSize * .9;
		let halfBrick = this.brickSize / 2;
		let col = this.col;
		let rev = 256 - this.col;

		ctx.save();
		ctx.strokeStyle = 'rgba(' + col + ', ' + col + ', ' + rev + ', .7)';
		ctx.fillStyle = ctx.strokeStyle;
		for (let y = 0; y < this.bricks.height; y++) {
			let ix = y * bw;
			let top = y * this.brickSize;

			for (let x = 0; x < bw; x++, ix += 4) {
				let left = x * this.brickSize;
				let brickNum = brick[ix + 2];

				if (brickNum == 254) {
					let ax = left + halfBrick;
					let ay = top + halfBrick;
	
					ctx.beginPath();
					ctx.arc(ax, ay, brickWidth / 2, 0, Math.PI2, false);
					ctx.stroke();
//					ctx.strokeRect(left, top, brickWidth, brickWidth);
				} else if (0 < brickNum) {
					ctx.fillRect(left, top, brickWidth, brickWidth);
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
	}

	save() {
		return new MapEntity().saveMap(this.formData);
	}

	static create(mapId) {
		return new MapEntity().select(mapId).then(map => {
			return Object.assign(new FieldMapEditor(), map).init();
		});
	}
}

class LandformEditor extends Landform {
	constructor(canvas) {
		super(canvas);
	}

	drawEnemy(num, x, y, reverse = false) {
		let ctx = this.ctx;
		let obj = Enemy.LIST[num];

		ctx.save();
		ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.beginPath();
		ctx.arc(x, y, 4, 0, Math.PI2, false);
		ctx.fill();
		ctx.fillText(num, x, y);
		ctx.restore();
		if (!obj || !obj.instance) {
			return null;
		}
		let fg = Product.Instance.stage.fg;
		let gx = fg.x;
		let gy = fg.y;
		let cnt = obj.formation ? 3 : 1;
		let enemy = obj.instance;
		let ex = x + enemy.hW;
		let ey = y + enemy.hH;

		enemy.x = ex - gx;
		enemy.y = ey - gy;
		enemy.checkInverse();
		enemy.x = ex;
		enemy.y = ey;
		while (cnt--) {
			enemy.draw(ctx);
			enemy.x += 2;
			enemy.y += 2;
		}
		if (reverse) {
			ctx.save();
			ctx.translate(enemy.x, enemy.y);
			ctx.drawImage(this.reverse, -8, -4);
			ctx.restore();
		}
		return enemy;
	}

	drawBrick() {
		if (!this.brick) {
			return;
		}
		let field = Field.Instance;
		let fg = this.stage.fg;
		let gx = fg.x;
		let gy = fg.y;
		let ctx = this.ctx;
		let red = 255 < this.col ? this.col - 256 : 0;
		let green = 255 < this.col ? 255 : this.col % 256;
		let brickWidth = Landform.BRICK_WIDTH - 2;
		let sx = Math.round(gx / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let startX = sx / Landform.BRICK_WIDTH;
		let endX = Math.min(startX + 512 / Landform.BRICK_WIDTH, this.bw);
		let sy = Math.round(gy / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let startY = sy / Landform.BRICK_WIDTH;
		let bd = this.brick.data;
	
		ctx.save();
		ctx.translate(-gx, -gy);
		ctx.strokeStyle = 'rgba(' + red + ', ' + green + ', 255, .4)';
		ctx.fillStyle = ctx.strokeStyle;
		for (let y = 0; y < this.bh; y++) {
			let iy = startY + y;
			let ry = iy * Landform.BRICK_WIDTH;
			let ix = ((iy % this.bh) * this.bw + startX) * 4;
	
			for (let x = startX, rx = sx; x < endX; x++, rx += Landform.BRICK_WIDTH, ix += 4) {
				if (x < 0) {
					continue;
				}
				let attr = bd[ix];
				let enemyNum = bd[ix + 1];
				if (enemyNum) {
					let reverse = attr & Landform.ATTR.REVERSE;

					this.drawEnemy(enemyNum, rx, ry, reverse);
				}
				let brickNum = bd[ix + 2];
				if (brickNum == 255) {
					ctx.fillRect(rx, ry, brickWidth, brickWidth);
				} else if (brickNum == 254) {
					let ax = rx + Landform.BRICK_HALF - 1;
					let ay = ry + Landform.BRICK_HALF - 1;
	
					ctx.beginPath();
					ctx.arc(ax, ay, brickWidth / 2, 0, Math.PI2, false);
					ctx.stroke();
					ctx.strokeRect(rx, ry, brickWidth, brickWidth);
				}
			}
		}
		if (this.width - field.width <= gx) {
			let x = this.width - Landform.BRICK_WIDTH;
			ctx.fillStyle = 'rgba(255, 0, 0, .4)';
			ctx.fillRect(x, 0, Landform.BRICK_WIDTH, this.height);
		}
		ctx.restore();
		this.col += this.colDir * 16;
		if (this.col <= 0 || Landform.COL_MAX <= this.col) {
			this.colDir *= -1;
		}
	}

	drawTarget() {
		if (!this.target) {
			return;
		}
		let tx = Math.round((this.target.x - Landform.BRICK_HALF) / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let ty = Math.round((this.target.y - Landform.BRICK_HALF) / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let ctx = this.ctx;
		let bw = Landform.BRICK_WIDTH;
		let selection = parseInt(this.selection);

		if (0 < selection) {
			let enemy = this.drawEnemy(selection, tx, ty);

			if (enemy) {
				bw = enemy.width;
			}
		}
		ctx.save();
		ctx.fillStyle = 'rgba(128, 255, 255, .4)';
		ctx.fillRect(tx, ty, bw, bw);
		ctx.restore();
		this.touchDown(tx, ty);
	}

	touchDown(tx, ty) {
		if (!this.which) {
			this.tx = -1;
			this.ty = -1;
			this.brickVal = null;
			return;
		}
		if (this.tx == tx && this.ty == ty) {
			return;
		}
		let selection = parseInt(this.selection);
		if (0 < selection) {
			// enemy
			let attr = this.getAttr(this.target);
			let actor = this.getActor(this.target);
			let reverse = attr & Landform.ATTR.REVERSE;

			if (actor == selection && reverse) {
				this.putActor(this.target, 0, 0);
			} else if (actor == selection) {
				attr |= Landform.ATTR.REVERSE;
				this.putActor(this.target, selection, attr);
			} else {
				attr &= ~Landform.ATTR.REVERSE;
				this.putActor(this.target, selection, attr);
			}
		} else {
			let brick = this.getBrick(this.target);

			selection = this.selection.substr(1);
			if (this.brickVal == null) {
				this.brickVal = 0 < brick ? 0 : 255 - selection;
			}
			this.putBrick(this.target, this.brickVal);
		}
		this.touch = true;
		this.tx = tx;
		this.ty = ty;
	}

	putActor(target, val, attr = null) {
		if (attr != null) {
			this.putBrick(target, attr, Landform.BRICK_LAYER.ATTR);
		}
		this.putBrick(target, val, Landform.BRICK_LAYER.ACTOR);
	}

	draw() {
		let ctx = this.ctx;

		super.draw();
		ctx.save();
		this.drawBrick();
		this.drawTarget();
		ctx.restore();
		if (this.touch && this.brick) {
			this.updateMap();
			this.touch = false;
		}
	}

	updateMap() {
		let mapImage = document.getElementById('mapImage');

		if (mapImage) {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			canvas.width = this.brick.width;
			canvas.height = this.brick.height;
			ctx.putImageData(this.brick, 0, 0);
			mapImage.setAttribute('src', canvas.toDataURL('image/png'));
		}
	}

	getImageData() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;
		ctx.drawImage(this.img, 0, 0);
		return ctx.getImageData(0, 0, this.width, this.height);
	}

	getBrickData(ctx) {
		if (this.brick != null) {
			return this.brick;
		}
		let bw = this.width / Landform.BRICK_WIDTH;
		let bh = this.height / Landform.BRICK_WIDTH;
		return ctx.createImageData(bw, bh);
	}

	generateBrick(ctx) {
		if (!this.img.src || !this.img.complete) {
			return;
		}
		let img = this.getImageData();
		let bw = this.width / Landform.BRICK_WIDTH;
		let bh = this.height / Landform.BRICK_WIDTH;
		let brick = this.getBrickData(ctx);
		let dst = brick.data;
		let sx = this.width * Landform.BRICK_HALF + Landform.BRICK_HALF * 4;
		let ix = 0;

console.log(this.width + ' x ' + this.height + ' | ' + (this.width * this.height * 4));
console.log(bw + ' x ' + bh + ' | ' + dst.length);
		for (let y = 0; y < bh; y++) {
			for (let x = 0; x < bw; x++) {
				let dot = false;

				for (let c = 0; c < 4; c++) {
					if (img.data[sx + c]) {
						dot = true;
					}
				}
				let val = dot ? 255 : 0;
				dst[ix + 2] = val;
				dst[ix + 3] = val;
				sx += Landform.BRICK_WIDTH * 4;
				ix += 4;
			}
			sx += this.width * (Landform.BRICK_WIDTH - 1) * 4;
		}
console.log('ix:' + ix);
console.log('sx:' + sx);
		this.brick = brick;
		this.touch = true;
	}

	wheel(delta) {
		let fg = this.stage.fg;

		if (delta < 0){
			fg.y += Landform.BRICK_WIDTH;
			if (this.height <= fg.y) {
				fg.y = 0;
			}
		} else {
			if (fg.y == 0) {
				fg.y = this.height;
			}
			fg.y -= Landform.BRICK_WIDTH;
		}
	}
}

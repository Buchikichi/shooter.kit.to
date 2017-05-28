class LandformEditor extends Landform {
	constructor(canvas) {
		super(canvas);
	}

	drawEnemy(num, x, y) {
		let reverse = Enemy.MAX_TYPE < num;
		let ix = reverse ? num - Enemy.MAX_TYPE : num;
		let obj = Enemy.LIST[ix - 1];

		if (!obj || !obj.instance) {
			return null;
		}
		let cnt = obj.formation ? 3 : 1;
		let enemy = obj.instance;
		let ctx = this.ctx;

		enemy.x = x + enemy.hW;
		enemy.y = y + enemy.hH;
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
				let enemyNum = bd[ix + 1];
				if (enemyNum) {
					this.drawEnemy(enemyNum, rx, ry);
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
			let brick = this.getBrick(this.target, 1);
			let reverse = brick - Enemy.MAX_TYPE;

			if (!brick || (brick != selection && reverse != selection)) {
				this.putBrick(this.target, 1, selection);
			} else if (brick == selection) {
				this.putBrick(this.target, 1, selection + Enemy.MAX_TYPE);
			} else {
				this.putBrick(this.target, 1, 0);
			}
		} else {
			let brick = this.getBrick(this.target, 2);

			selection = this.selection.substr(1);
			if (this.brickVal == null) {
				this.brickVal = 0 < brick ? 0 : 255 - selection;
			}
			this.putBrick(this.target, 2, this.brickVal);
		}
		this.touch = true;
		this.tx = tx;
		this.ty = ty;
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
}

class Bricks {
	constructor(fieldMap) {
		let img = new Image();

		this.bricks = null;
		img.onload = ()=> {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			this.bricks = ctx.getImageData(0, 0, img.width, img.height);
		};
		img.src = fieldMap.map;
		this.fieldMap = fieldMap;
	}

	isHit(actor, isLoop) {
		if (!this.bricks) {
			return;
		}
		let brickSize = this.fieldMap.brickSize;
		let x = parseInt(actor.x / brickSize);
		let y = parseInt(actor.y / brickSize);

		if (isLoop) {
			if (y < 0) {
				y += this.bricks.height;
			}
			if (this.bricks.height < y) {
				y -= this.bricks.height;
			}
		}
		if (x < 0 || this.bricks.width < x || y < 0 || this.bricks.height < y) {
			return false;
		}
		let ix = (y * this.bricks.width + x) * 4;
		let type = this.bricks.data[ix + 2];

		if (0 < type) {
			if (actor.collidingWallType & Actor.CollidingWallType.CRUSH) {
				actor.fate();
			}
		}
		if (type == Bricks.BRICK_TYPE.BRITTLE) {
			if (actor.collidingWallType & Actor.CollidingWallType.SMASH) {
				this.bricks.data[ix + 2] = 0;
				this.fieldMap._mainVisual.smash(actor);
			}
		}
		return type;
	}

	draw(ctx) {
		let bw = this.bricks.width * 4;
		let brick = this.bricks.data;
		let brickSize = this.fieldMap.brickSize;
		let brickWidth = brickSize * .9;
		let halfBrick = brickSize / 2;
		let minLeft = this.fieldMap.progress / this.fieldMap.scale - brickSize;

		ctx.save();
		ctx.strokeStyle = 'rgba(255, 255, 255, .3)';
		ctx.fillStyle = 'rgba(0, 0, 0, .3)';
		for (let y = 0; y < this.bricks.height; y++) {
			let ix = y * bw;
			let top = y * brickSize;
let firstX = true;

			for (let x = 0; x < bw; x++, ix += 4) {
				let left = x * brickSize;
				let brickType = brick[ix + 2];

				if (left < minLeft) {
					continue;
				}
if (firstX) {
	ctx.fillStyle = 'rgba(0, 0, 0, .8)';
	firstX = false;
} else {
	ctx.fillStyle = 'rgba(0, 0, 0, .3)';
}
				if (brickType == Bricks.BRICK_TYPE.BRITTLE) {
					let ax = left + halfBrick;
					let ay = top + halfBrick;
	
					ctx.beginPath();
					ctx.arc(ax, ay, brickWidth / 2, 0, Math.PI2, false);
					ctx.fill();
					ctx.stroke();
//					ctx.strokeRect(left, top, brickWidth, brickWidth);
				} else if (0 < brickType) {
					ctx.fillRect(left, top, brickWidth, brickWidth);
					ctx.strokeRect(left, top, brickWidth, brickWidth);
				}
			}
		}
		ctx.restore();
	}
}
Bricks.BRICK_TYPE = {
	WALL: 255,
	BRITTLE: 254,
};

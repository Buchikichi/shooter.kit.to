class Bricks {
	constructor(fieldMap) {
		this.bricks = null;
		if (fieldMap.map) {
			let img = new Image();

			img.onload = ()=> {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');

				canvas.width = img.width;
				canvas.height = img.height;
				ctx.drawImage(img, 0, 0);
				this.bricks = ctx.getImageData(0, 0, img.width, img.height);
			};
			img.src = fieldMap.map;
		} else {
			this.reset(fieldMap);
		}
		this.fieldMap = fieldMap;
	}

	reset(fieldMap) {
		new Promise(resolve => {
			let checkImage = ()=> {
				if (fieldMap._mainVisual.image) {
					resolve(fieldMap._mainVisual.image);
					return;
				}
				setTimeout(checkImage, 30);
			};
			checkImage();
		}).then(img => {
			let width = img.width / fieldMap.brickSize;
			let height = img.height / fieldMap.brickSize;
			let size = width * height * 4;

			this.bricks = new ImageData(width, height);
			this.bricks.data = new Array(size);
		});
	}

	getIndex(actor) {
		if (!this.bricks) {
			return -1;
		}
		let brickSize = this.fieldMap.brickSize;
		let x = parseInt(actor.x / brickSize);
		let y = parseInt(actor.y / brickSize);

		if (actor._stage && actor._stage.isLoop) {
			if (y < 0) {
				y += this.bricks.height;
			}
			if (this.bricks.height < y) {
				y -= this.bricks.height;
			}
		}
		if (x < 0 || this.bricks.width < x || y < 0 || this.bricks.height < y) {
			return -1;
		}
		return (y * this.bricks.width + x) * 4;
	}

	getBrick(actor) {
		let ix = this.getIndex(actor);

		if (ix == -1) {
			return 0;
		}
		return this.bricks.data[ix + 2];
	}

	putBrick(ix, type) {
		this.bricks.data[ix + 2] = type;
		this.bricks.data[ix + 3] = type ? 255 : 0;
	}

	scanFloor(actor) {
		if (!this.bricks) {
			return;
		}
		let brickSize = this.fieldMap.brickSize;
		let y = actor.y;
		let type = this.getBrick(actor);
		let sign = actor.gravity < 0 ? -1 : 1;

		if (0 < type) {
			y = Math.floor(actor.y / brickSize) * brickSize;
			while (0 < type) {
				y -= brickSize * sign;
				let temp = {x:actor.x, y:y};
				type = this.getBrick(temp);
			}
			y += brickSize * sign;
		} else {
			y = Math.floor(actor.y / brickSize) * brickSize;
			if (sign < 0) {
				// top
				while (0 < y && !type) {
					y -= brickSize;
					let temp = {x:actor.x, y:y};

					type = this.getBrick(temp);
				}
				if (!type) {
					// abyss
					y = -actor.height - brickSize;
				}
			} else {
				// bottom
				while (y < actor._stage.height && !type) {
					y += brickSize;
					let temp = {x:actor.x, y:y};

					type = this.getBrick(temp);
				}
				if (!type) {
					// abyss
					y = actor._stage.height + actor.height + brickSize;
				}
			}
		}
		return y;
	}

	getHorizontalAngle(actor) {
		let brickSize = this.fieldMap.brickSize;
		let y = actor.y - brickSize * 2;
		let left = Object.assign({}, actor, {x:actor.x - brickSize, y:y});
		let right = Object.assign({}, actor, {x:actor.x + brickSize, y:y});
		let leftY = this.scanFloor(left);
		let rightY = this.scanFloor(right);

		return Math.atan2(rightY - leftY, actor.width);
	}

	isHit(actor) {
		if (!this.bricks) {
			return false;
		}
		let ix = this.getIndex(actor);

		if (ix == -1) {
			return false;
		}
		//
		let type = this.bricks.data[ix + 2];

		if (0 < type) {
			if (actor.collidingWallType & Actor.CollidingWallType.EJECT) {
				actor.eject();
			}
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

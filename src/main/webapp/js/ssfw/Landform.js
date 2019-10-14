/**
 * Landform.
 */
class Landform {
	constructor(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.effectH = 0;
		this.next = Landform.NEXT.NONE;
		this.col = 0;
		this.colDir = 1;
		this.target = null;
		this.tx = 0;
		this.ty = 0;
		this.selection = 'b0';
		this.which = null;
		this.brick = null;
		this.brickVal = null;
		this.touch = false;
		this.reverse = new Image();
		this.reverse.src = '/img/reverse.png';
		this.touch = false;
		this.scenarioList = [];
	}

	get mapImage() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.brick.width;
		canvas.height = this.brick.height;
		ctx.putImageData(this.brick, 0, 0);
		return canvas.toDataURL('image/png');
	}

	loadStage(stage) {
console.log('Landform#loadStage');
		let field = Field.Instance;
		let fgImg = stage.fg.image;

		stage.reset();
		this.stage = stage;
		if (stage.mapData) {
			this.loadMapData(stage.mapData);
		}
		this.width = fgImg.width;
		this.height = fgImg.height;
		this.bw = this.width / Landform.BRICK_WIDTH;
		this.bh = this.height / Landform.BRICK_WIDTH;
		this.viewX = this.width - (field.hW * 1.5);
		this.arrivX = this.width - field.width;
		this.noticeX = this.arrivX - field.hW;
		this.reset();
	}

	loadMapData(mapImage) {
		let img = new Image();

		img.onload = ()=> {
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');

			canvas.width = img.width;
			canvas.height = img.height;
			ctx.drawImage(img, 0, 0);
			this.brick = ctx.getImageData(0, 0, img.width, img.height);
			this.loadScenario();// TODO: 後で削除
			this.touch = true;
		}
		img.src = mapImage;
	}

	// 仮
	loadScenario() {
/*		if (0 < this.stage.scenarioList.length) {
			this.scenarioList = this.stage.scenarioList.concat();
console.log('scenarioList exists.');
			return;
		}
		for (let x = 0; x < this.brick.width; x++) {
			for (let y = 0; y < this.brick.height; y++) {
				let ix = x * 4 + this.brick.width * 4 * y;
				let num = this.brick.data[ix + 1];

				if (num == 0) {
					continue;
				}
				let attr = this.brick.data[ix];
				let reverse = attr & Landform.ATTR.REVERSE;
				let op = reverse ? 'reverse' : 'spawn';

				this.scenarioList.push({v:x, h:y, target:'e', number:num, op:op});
			}
		}
console.log('scenarioList created!!!');
//*/
	}

	reset() {
		this.next = Landform.NEXT.NONE;
		if (this.stage) {
			this.stage.reset();
		}
	}

	retry() {
		this.next = Landform.NEXT.NONE;
		if (this.stage) {
			this.stage.retry();
			this.loadMapData(this.stage.mapData);
		}
	}

	// brick
	getBrickIndex(target) {
		let fg = this.stage.fg;
		let gx = fg.x;
		let gy = fg.y;
		let tx = Math.round((gx + target.x - Landform.BRICK_HALF) / Landform.BRICK_WIDTH);
		if (tx < 0 || this.bw < tx) {
			return -1;
		}
		let ty = Math.round((gy + target.y - Landform.BRICK_HALF) / Landform.BRICK_WIDTH);
		ty %= this.bh;
		return ty * this.bw * 4 + tx * 4;
	}

	getBrick(target, c = Landform.BRICK_LAYER.BRICK) {
		if (!this.brick) {
			return null;
		}
		let ix = this.getBrickIndex(target);

		if (ix < 0) {
			return null;
		}
		return this.brick.data[ix + c];
	}

	getAttr(target) {
		return this.getBrick(target, Landform.BRICK_LAYER.ATTR);
	}

	getActor(target) {
		return this.getBrick(target, Landform.BRICK_LAYER.ACTOR);
	}

	putBrick(target, val, c = Landform.BRICK_LAYER.BRICK) {
		let ix = this.getBrickIndex(target);

		if (ix < 0) {
			return;
		}
		this.brick.data[ix + c] = val;
		this.brick.data[ix + 3] = val ? 255 : 0;
	}

	hitTest(target) {
		if (!this.brick) {
			return;
		}
		target.walled = this.getBrick(target);
		this.target = target;
	}

	smashWall(target) {
		let fg = this.stage.fg;

		fg.smashWall(target);
		this.putBrick(target, 0);
	}

	scanFloor(target) {
		if (!this.brick) {
			return;
		}
		let y = target.y;
		let brick = this.getBrick(target);
		let sign = target.gravity < 0 ? -1 : 1;

		if (0 < brick) {
			y = Math.floor(target.y / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
			while (0 < brick) {
				y -= Landform.BRICK_WIDTH * sign;
				let temp = {x:target.x, y:y};
				brick = this.getBrick(temp);
			}
			y += Landform.BRICK_WIDTH * sign;
		} else {
			y = Math.floor(target.y / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
			if (sign < 0) {
				// top
				while (0 < y && !brick) {
					y -= Landform.BRICK_WIDTH;
					let temp = {x:target.x, y:y};

					brick = this.getBrick(temp);
				}
				if (!brick) {
					// abyss
					y = -target.height - Landform.BRICK_WIDTH;
				}
			} else {
				// bottom
				while (y < this.height && !brick) {
					y += Landform.BRICK_WIDTH;
					let temp = {x:target.x, y:y};

					brick = this.getBrick(temp);
				}
				if (!brick) {
					// abyss
					y = this.height + target.height + Landform.BRICK_WIDTH;
				}
			}
		}
		return y;
	}

	getHorizontalAngle(target) {
		let left = {x:target.x - Landform.BRICK_WIDTH, y:target.y - Landform.BRICK_WIDTH*2};
		let right = {x:target.x + Landform.BRICK_WIDTH, y:target.y - Landform.BRICK_WIDTH*2};
		let leftY = this.scanFloor(left);
		let rightY = this.scanFloor(right);

		return Math.atan2(rightY - leftY, target.width);
	}
}
Landform.BRICK_WIDTH = 8;
Landform.BRICK_HALF = Landform.BRICK_WIDTH / 2;
Landform.BRICK_LAYER = {
	ATTR: 0,
	ACTOR: 1,
	BRICK: 2,
};
Landform.BRICK_TYPE = {
	WALL: 255,
	BRITTLE: 254,
};
Landform.ATTR = {
	NONE: 0,
	REVERSE: 1,
};
Landform.COL_MAX = 512;
Landform.NEXT = {
	NONE: 0,
	NOTICE: 1,
	ARRIV: 2,
	IDLE: 3,
	PAST: 4
};

/*
 * for play.
 */
Landform.prototype.effect = function(target) {
	let maxX = Math.max(Field.Instance.width + target.width, target.maxX);

	if (target.effectH) {
		target.x -= this.effectH;
	}
	if (target.effectV && this.next == Landform.NEXT.NONE) {
		let speed = this.stage.fg.speed;

		target.y += this.stage.effectV * speed;
	}
	if (target.x < target.minX || maxX < target.x) {
		target.eject();
	}
	if (this.stage.scroll == Stage.SCROLL.OFF) {
		if (target.y < target.minY || target.maxY < target.y) {
			target.eject();
		}
		return;
	}
	if (this.stage.scroll == Stage.SCROLL.ON) {
		if (target.y < -this.height || this.height + target.maxY < target.y) {
			target.eject();
		}
		return;
	}
	// Stage.SCROLL.LOOP
	if (target.gravity) {
		let dy = Math.abs(target.dy * target.speed);

		if (Landform.BRICK_WIDTH + Landform.BRICK_HALF < dy) {
//console.log('dy:' + dy);
			target.eject();
			return;
		}
	}
	if (target.y < 0) {
		target.y += this.height;
	} else if (this.height < target.y) {
		target.y -= this.height;
	}
};

Landform.prototype.forward = function(target) {
	if (!this.width) {
		return Landform.NEXT.NONE;
	}
	let fg = this.stage.fg;

	if (this.next != Landform.NEXT.ARRIV) {
		this.stage.scrollV(target);
	}
	if (this.viewX <= fg.x) {
		this.effectH = 0;
		if (this.next != Landform.NEXT.PAST) {
			this.next = Landform.NEXT.PAST;
			return Landform.NEXT.PAST;
		}
		return Landform.NEXT.NONE;
	}
	this.stage.forward();
	this.effectH = fg.effectH;
	if (this.arrivX <= fg.x) {
		if (this.next == Landform.NEXT.NOTICE) {
			fg.x = this.arrivX;
			this.effectH = 0;
			this.next = Landform.NEXT.ARRIV;
			return Landform.NEXT.ARRIV;
		}
		if (this.arrivX < fg.x) {
			this.next = Landform.NEXT.IDLE;
			return Landform.NEXT.IDLE;
		}
	} else if (this.noticeX <= fg.x) {
		if (this.next != Landform.NEXT.NOTICE) {
			this.next = Landform.NEXT.NOTICE;
			return Landform.NEXT.NOTICE;
		}
	}
	return Landform.NEXT.NONE;
};

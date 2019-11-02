class Stage {
	constructor() {
		this.foreground = null;
		this.bgm = null;
		this.boss = null;
		this.checkPoint = Stage.CHECK_POINT[0];
		this.viewDic = {};
		this.effectH = 0;
		this.effectV = 0;
		this.progress = 0;
		this.eventList = [];
		this.lastScan = null;
	}

	get isMoving() {
		return this.phase == Stage.PHASE.NORMAL;
	}

	setBgm(bgm, boss = null) {
		this.bgm = bgm;
		this.boss = boss;
		return this;
	}

	playBgm() {
		if (this.bgm) {
			AudioMixer.INSTANCE.play(this.bgm, .7, true);
		}
	}

	get fg() {
		if (!this.foreground) {
			this.foreground = this.map._mainVisual;
		}
		return this.foreground;
	}

	getGround(id) {
		return this.viewDic[id];
	}

	reset() {
		this.checkPoint = Stage.CHECK_POINT[0];
		this.retry();
	}

	retry() {
		this.phase = Stage.PHASE.NORMAL;
		this.progress = -this.product.width / this.map._mainVisual.speed;
		this.hibernate = this.product.maxHibernate;

		this.scroll = this.scrollSv;
		this.effectH = 0;
		this.effectV = 0;
		this.map.setProgress(this.progress);
		this.view.forEach(ground => {
			ground.reset(this.checkPoint);
		});
		this.eventList = this.scenarioList.concat();
		this.playBgm();
	}

	scrollV(target) {
		this.effectV = 0;
		if (this.scroll == Stage.SCROLL.OFF) {
			return;
		}
		let diff = this.product.hH - target.y;
		let fg = this.fg;

		if (this.scroll == Stage.SCROLL.TOP) {
			diff = fg.speed * 5;
		} else if (this.scroll == Stage.SCROLL.BOTTOM) {
			diff = -fg.speed * 5;
		} else if (Math.abs(diff) < fg.speed) {
			return;
		}
		let dy = diff / 3;
		let nextY = fg.y - dy;
		let fgViewY = fg.image.height - this.product.height;

		if (this.scroll == Stage.SCROLL.ON) {
			if (nextY < 0 || fgViewY < nextY) {
				return;
			}
		}
	//console.log('Y:' + fg.y);
		if (this.scroll == Stage.SCROLL.TOP && nextY < 0) {
			this.scroll = Stage.SCROLL.OFF;
			return;
		}
		if (this.scroll == Stage.SCROLL.BOTTOM) {
console.log('nextY:' + nextY + '/' + fg.image.height);
			if (fgViewY < nextY) {
				this.scroll = Stage.SCROLL.OFF;
				return;
			}
		}
		this.effectV = dy;
	}

	effect(target) {
		let fg = this.fg;

//		if (target.y < 0) {
//			target.y += this.fg.height;
//		} else if (this.fg.height < target.y) {
//			target.y -= this.fg.height;
//		}
		if (!this.isMoving) {
			return;
		}
		if (target.effectH) {
			target.x -= Math.cos(fg.radian) * fg.speed;
		}
		if (target.effectV) {
			target.y -= Math.sin(fg.radian) * fg.speed;
		}
	}

	scanEvent() {
		let result = [];
		let fg = this.fg;
		let gx = -fg.x;
		let gy = fg.y;
		let rear = Math.round(gx / Landform.BRICK_WIDTH);

		if (rear == this.lastScan) {
			return result;
		}
		//
		let front = Math.round((gx + this.product.width) / Landform.BRICK_WIDTH);
		let newList = [];

		this.eventList.forEach(rec => {
			let spawn = false;
			let isFront = rec.op == 'spawn';

			if (isFront) {
				if (rec.v < front) {
					return;
				}
				if (rec.v == front) {
					spawn = true;
				}
			} else if (rec.op == 'reverse') {
				if (rec.v < rear) {
					return;
				}
				if (rec.v == rear) {
					spawn = true;
				}
			}
			if (!spawn) {
				newList.push(rec);
				return;
			}
			// spawn
			let x = gx + (isFront ? this.product.width + Landform.BRICK_WIDTH * 1.5 : 0);
			let y = -gy + (rec.h + 1) * Landform.BRICK_WIDTH;
			let reserve = Enemy.assign(rec.number, x, y);

			if (reserve != null) {
				let enemy;

				if (reserve.formation) {
					enemy = new Formation(reserve.x, reserve.y).setup(reserve.type, 8);
				} else {
					enemy = new reserve.type(reserve.x, reserve.y);
				}
				enemy.stage = this;
				result.push(enemy);
			}
		});
		this.eventList = newList;
		this.lastScan = rear;
		return result;
	}

	forward() {
		this.map.setProgress(this.progress++);
//		this.view.forEach(ground => {
//			ground.forward();
//		});
		let fgX = this.fg.x;

		Stage.CHECK_POINT.forEach(cp => {
			if (cp.x <= fgX && this.checkPoint.x < fgX) {
				this.checkPoint = cp;
			}
		});
	}

	notice() {
		if (this.scroll != Stage.SCROLL.ON && this.scroll != Stage.SCROLL.LOOP) {
			return;
		}
		let fg = this.fg;

		if (fg.y < fg.image.height / 2) {
			this.scroll = Stage.SCROLL.TOP;
		} else {
			this.scroll = Stage.SCROLL.BOTTOM;
		}
	}

	toBossMode() {
		this.phase = Stage.PHASE.BOSS;
		if (this.boss) {
			AudioMixer.INSTANCE.play(this.boss, .7, true);
		}
//		if (this.scroll == Stage.SCROLL.LOOP) {
//			this.scroll = Stage.SCROLL.ON;
//		}
	}

	draw(ctx) {
	}

	/**
	 * レコードからステージを生成.
	 */
	static createViewList(rec) {
		let list = [];

		Stage.VIEWS.forEach(key => {
			let imageId = rec[key];

			if (!imageId || imageId.length == 0) {
				return;
			}
			let speed = rec[key + 'speed'];
			let dir = rec[key + 'dir'];
			let blink = rec[key + 'blink'];
			let view;
			// (img, speed = .5, dir = 0, blink = 0)
			if (key.startsWith('b')) {
				view = new StageBg(imageId, speed, dir, blink);
			} else {
				view = new StageFg(imageId, speed, dir, blink);
			}
			view.viewId = key;
			list.push(view);
		});
		return list;
	} 

	init() {
		this.map = FieldMap.create(this.map);
this.view = [];//Stage.createViewList(this.map);
this.view.forEach(ground => {
	ground.stage = this;
	this.viewDic[ground.viewId] = ground;
});
		this.scroll = this.roll;
		this.scrollSv = this.roll;
		this.setBgm(this.map.theme, this.map.boss);
		return this;
	}

	static create(rec) {
		return Object.assign(new Stage(), rec).init();
	}
}
Stage.SCROLL = {
	OFF: 0,
	ON: 1,
	LOOP: 2,
	TOP: 4,
	BOTTOM: 8
};
Stage.PHASE = {
	NORMAL: 0,
	BOSS: 1
};
Stage.VIEWS = ['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'];
Stage.CHECK_POINT = [{x:0, y:0}, {x:660, y:0}, {x:1440, y:0}];


/**
 * Foreground and Background.
 */
class StageView {
	constructor(imageId, speed, dir, blink) {
		this.imageId = imageId;
		this.speed = speed;
		this.dir = dir;
		this.blink = blink;
		this.pattern = null;
		this.repeatX = 2;
		this.repeatY = 2;
	}

	get img() {
		return VisualManager.Instance.dic[this.imageId];
	}

	reset(checkPoint) {
		if (!this.width) {
			let img = this.img;

			this.width = img.width;
			this.height = img.height;
			this.w2 = img.width * this.repeatX;
			this.h2 = img.height * this.repeatY;
		}
		this.x = checkPoint.x % this.width;
		this.y = 0;
		this.effectH = 0;
		this.effectV = 0;
		this.alpha = 1;
		this.blinkDir = -1;
	}

	forward() {
		let effectV = this.stage.effectV;

		this.effectH = Math.cos(this.dir) * this.speed;
		this.effectV = Math.sin(this.dir) * this.speed;
		this.x += this.effectH;
		this.y += this.effectV;
		this.y -= effectV * this.speed;
		if (this.width < this.x) {
			this.x -= this.width;
		}
		if (this.y < 0) {
			this.y += this.height;
		}
		if (this.height < this.y) {
			this.y -= this.height;
		}
	}

	getPattern(ctx) {
		if (!this.pattern) {
			this.pattern = ctx.createPattern(this.img, 'repeat');
		}
		return this.pattern;
	}

	draw(ctx) {
		if (this.blink) {
			this.alpha += this.blinkDir * this.blink;
			if (this.alpha <= 0.3 || 1.0 <= this.alpha) {
				this.blinkDir *= -1;
			}
		}
		ctx.save();
		ctx.globalAlpha = this.alpha;
		ctx.translate(-this.x, -this.y);
		ctx.beginPath();
		ctx.fillStyle = this.getPattern(ctx);
		ctx.rect(0, 0, this.w2, this.h2);
		ctx.fill();
		ctx.restore();
	}
}

/**
 * Foreground information.
 */
class StageFg extends StageView {
	constructor(imageId, speed = .5, dir = 0, blink = 0) {
		super(imageId, speed, dir, blink);
		this.repeatX = 1;
	}

	createCanvas() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.width;
		canvas.height = this.height;
		ctx.clearRect(0, 0, this.width, this.height);
		ctx.drawImage(this.img, 0, 0);
		return canvas;
	}

	reset(checkPoint) {
		super.reset(checkPoint);
		if (checkPoint.x == 0) {
			this.x = -this.product.width;
		}
		this.canvas = this.createCanvas();
		this.pattern = canvas.getContext('2d').createPattern(this.canvas, 'repeat');
	}

	smashWall(target) {
		let tx = Math.round((this.x + target.x - Landform.BRICK_HALF) / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let ty = Math.round((this.y + target.y - Landform.BRICK_HALF) / Landform.BRICK_WIDTH) * Landform.BRICK_WIDTH;
		let ctx = this.canvas.getContext('2d');

		ty %= this.height;
		ctx.clearRect(tx, ty, Landform.BRICK_WIDTH, Landform.BRICK_WIDTH);
		this.pattern = ctx.createPattern(this.canvas, 'repeat');
	}
}

/**
 * Background information.
 */
class StageBg extends StageView {
	constructor(imageId, speed = .5, dir = 0, blink = 0) {
		super(imageId, speed, dir, blink);
	}
}

class Stage {
	constructor(scroll, map, view) {
		this.scroll = scroll;
		this.scrollSv = scroll;
		this.map = map;
		this.view = view;
		this.foreground = null;
		this.bgm = null;
		this.boss = null;
		this.checkPoint = 0;
		this.viewDic = {};
		this.view.forEach(ground => {
			ground.stage = this;
			this.viewDic[ground.viewId] = ground;
		});
		this.effectH = 0;
		this.effectV = 0;
	}

	setBgm(bgm, boss = null) {
		this.bgm = bgm;
		this.boss = boss;
		AudioMixer.INSTANCE.reserve([this.bgm, this.boss]);
		return this;
	}

	playBgm() {
		if (this.bgm) {
	//console.log('playBgm:');
			AudioMixer.INSTANCE.play(this.bgm, .7, true);
		}
	}

	get fg() {
		if (this.foreground) {
			return this.foreground;
		}
		let fg;

		this.view.forEach(ground => {
			if (ground instanceof StageFg) {
				fg = ground;
			}
		});
		this.foreground = fg;
		return fg;
	}

	getGround(id) {
		return this.viewDic[id];
	}

	reset() {
		this.checkPoint = Stage.CHECK_POINT[0];
		this.retry();
	}

	retry() {
		this.scroll = this.scrollSv;
		this.effectH = 0;
		this.effectV = 0;
		this.view.forEach(ground => {
			ground.reset(this.checkPoint);
		});
		this.playBgm();
	}

	moveH(x) {
		if (this.fg.speed == 0) {
			return;
		}
		let step = x / this.fg.speed;

//console.log('moveH:' + x);
//console.log(step + '/' + this.fg.speed);
		this.view.forEach(ground => {
			ground.x = step * ground.speed % ground.width;
//console.log(ground.viewId + ':' + ground.x);
		});
	}

	scrollV(target) {
		this.effectV = 0;
		if (this.scroll == Stage.SCROLL.OFF) {
			return;
		}
		let field = Field.Instance;
		let diff = field.hH - target.y;
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
		let fgViewY = fg.height - field.height;

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
			console.log('nextY:' + nextY + '/' + fg.height);
			if (fgViewY < nextY) {
				this.scroll = Stage.SCROLL.OFF;
				return;
			}
		}
		this.effectV = dy;
	}

	forward(landform) {
		this.view.forEach(ground => {
			ground.forward(landform);
		});
		let fgX = this.fg.x;

		Stage.CHECK_POINT.forEach(cp => {
			if (cp <= fgX && this.checkPoint < fgX) {
				this.checkPoint = cp;
			}
		});
	}

	drawBg(ctx) {
		this.view.forEach(ground => {
			if (ground instanceof StageFg) {
				return;
			}
			ground.draw(ctx);
		});
	}

	drawFg(ctx) {
		this.view.forEach(ground => {
			if (ground instanceof StageBg) {
				return;
			}
			ground.draw(ctx);
		});
	}

	notice() {
		if (this.scroll != Stage.SCROLL.ON && this.scroll != Stage.SCROLL.LOOP) {
			return;
		}
		let fg = this.fg;

		if (fg.y < fg.height / 2) {
			this.scroll = Stage.SCROLL.TOP;
		} else {
			this.scroll = Stage.SCROLL.BOTTOM;
		}
	}

	toBossMode() {
		if (this.boss) {
			AudioMixer.INSTANCE.play(this.boss, .7, true);
		}
//		if (this.scroll == Stage.SCROLL.LOOP) {
//			this.scroll = Stage.SCROLL.ON;
//		}
	}
}
Stage.SCROLL = {
	OFF: 0,
	ON: 1,
	LOOP: 2,
	TOP: 4,
	BOTTOM: 8
};
Stage.VIEWS = ['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'];
Stage.LIST = [];
Stage.CHECK_POINT = [0, 660, 1440];
/**
 * レコードからステージを生成.
 */
Stage.createViewList = rec => {
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
		ImageManager.Instance.reserve(imageId);
	}

	get img() {
		return ImageManager.Instance.dic[this.imageId];
	}

	reset(checkPoint) {
		if (!this.width) {
			let img = this.img;

			this.width = img.width;
			this.height = img.height;
			this.w2 = img.width * this.repeatX;
			this.h2 = img.height * this.repeatY;
		}
		this.x = checkPoint % this.width;
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
		if (checkPoint == 0) {
			this.x = -Field.Instance.width;
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

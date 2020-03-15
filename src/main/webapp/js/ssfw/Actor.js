class Matter {
	constructor(x = 0, y = 0, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.dy = 0;
		this.dir = null;
		this.radian = 0;
		this.gravity = 0;
		this.speed = 1;
	}

	setRect(width, height) {
		this.width = width;
		this.hW = width / 2;
		this.height = height;
		this.hH = height / 2;
	}

	move(){};
}

/**
 * Actor.
 */
class Actor extends Matter {
	constructor(x = 0, y = 0, z = 0) {
		super(x, y, z);
		this.region = new Region(this);
		this.setRect(16, 16);
		this.animList = [];
		this.chamberList = [];
		this.hasBounds = true;
		this.reaction = 0;
		this.effectH = false;
		this.effectV = false;
		this.hitPoint = 1;
		this.activityAreaType = Actor.ActivityAreaType.FREEDOM;
		this.collidingWallType = Actor.CollidingWallType.THROUGH;

		this.absorbed = false;
		this.absorbedTarget = null;
		this.score = 0;
		this.walled = false;
		this.isInverse = false;
//		this.img = new Image();
//		this.img.addEventListener('load', ()=> {
//			this.width = this.img.width;
//			this.height = this.img.height;
//		});
		this.fillStyle = null;
		this.sfx = 'sfx-explosion';
		this.sfxAbsorb = 'sfx-absorb';
		this.enter();
	}

	set anim(val) {
		if (Array.isArray(val)) {
			this.animList = val;
		} else {
			this.animList = [val];
		}
		let width = this.width;
		let height = this.height;

		this.animList.forEach(anim => {
			anim.actor = this;
			width = Math.max(width, anim.width);
			height = Math.max(height, anim.height);
		});
		this.setRect(width, height);
	}

	checkInverse() {
		// abstract
	}

	enter() {
		this.explosion = 0;
		this.isGone = false;
	}

	eject() {
		// console.log('Actor#eject:' + this.constructor.name + (this.id ? ':' + this.id : ''));
		this.isGone = true;
//		this.x = Number.MIN_SAFE_INTEGER;
	}

	aim(target) {
		if (target) {
			let dist = this.calcDistance(target);

			if (this.speed < dist) {
				let dx = target.x - this.x;
				let dy = target.y - this.y;

				this.dir = Math.atan2(dy, dx);
			}
		} else {
			this.dir = null;
		}
		return this;
	}

	closeGap(target) {
		let dx = target.x - this.x;
		let dy = target.y - this.y;
		let diff = Math.trim(this.radian - Math.atan2(dy, dx));

		if (Math.abs(diff) <= Actor.DEG_STEP) {
			return 0;
		}
		if (0 < diff) {
			return -Actor.DEG_STEP;
		}
		return Actor.DEG_STEP;
	}

	reactX(y) {
		this.dir = Math.trim(this.dir + Math.PI);
	}

	reactY(y) {
		this.y = y;
		this.dy *= -this.reaction;
		this.radian = this._stage.map.getHorizontalAngle(this);
	}

	trigger(target, force = false) {
		let result = [];

		this.chamberList.forEach(chamber => chamber.probe());
		if ((target == null || !target.isGone) && (this.triggered || force)) {
			this.triggered = false;
			this.chamberList.forEach(chamber => {
				let shot = chamber.fire(this, target);

				if (shot) {
					result.push(shot);
				}
			});
		}
		return result;
	}

	checkActivityArea() {
		if (!this._stage) {
			return;
		}
		let x = this.x - this._stage.map.x;
		let y = this.y - this._stage.map.y;
		let mapX = this._stage.map.x;
		let mapY = this._stage.map.y;
		let height = this._stage.map._mainVisual.image.height;

		if (this.activityAreaType == Actor.ActivityAreaType.RESTRICTION) {
			let areaLeft = mapX + this.hW;
			let areaRight = mapX + Product.Instance.width - this.hW;
			let areaTop = mapY + this.hH;
			let areaBottom = mapY + Product.Instance.height - this.hH;

			if (this.x < areaLeft) {
				this.x = areaLeft;
			} else if (areaRight < this.x) {
				this.x = areaRight;
			}
			if (this._stage.scroll != Stage.SCROLL.LOOP) {
				if (this.y < areaTop) {
					this.y = areaTop;
				} else if (areaBottom < this.y) {
					this.y = areaBottom;
				}
			}
			return;
		}
		if (this.activityAreaType == Actor.ActivityAreaType.EJECT) {
			if (x < -this.width || Product.Instance.width + this.width < x) {
				this.eject();
//console.log('EJECT:' + this.x + '/' + this.y);
			}
			if (this._stage.scroll != Stage.SCROLL.LOOP && (y < -this.height || height + this.height < y)) {
				this.eject();
			}
			return;
		}
		// Actor.ActivityAreaType.FREEDOM
		let areaLeft = -Product.Instance.width;
		let areaRight = Product.Instance.width * 2;
		let areaTop = -Product.Instance.height;
		let areaBottom = height + Product.Instance.height;

		if (x < areaLeft || areaRight < x) {
			// console.log('Actor#checkActivityArea FREEDOM:' + x + '|L:' + areaLeft + '/R:' + areaRight);
			this.eject();
		}
		if (this._stage.scroll != Stage.SCROLL.LOOP && (y < areaTop || areaBottom < y)) {
			// console.log('Actor#checkActivityArea FREEDOM:' + y + '|T:' + areaTop + '/B:' + areaBottom);
			this.eject();
		}
	}

	/**
	 * Move.
	 * @param target
	 */
	move(target) {
		if (0 < this.explosion) {
			this.explosion--;
			if (this.explosion == 0) {
				this.eject();
				return;
			}
		}
		this.svX = this.x;
		this.svY = this.y;
		if (this.dir != null) {
			this.x += Math.cos(this.dir) * this.speed;
			this.y += Math.sin(this.dir) * this.speed;
		}
		if (this.gravity != 0) {
			let y = this._stage.map.scanFloor(this);
			let lift = false;

			if (this.gravity < 0) {
				y += this.hH;
				if (y < this.y) {
					this.dy += this.gravity;
				} else if (this.y < y) {
					lift = true;
				}
			} else {
				y -= this.hH;
				if (this.y < y) {
					this.dy += this.gravity;
				} else if (y < this.y) {
					lift = true;
				}
			}
			if (lift) {
				let diff = Math.abs(this.y - y);

				if (this._stage.map.brickSize * 2 < diff) {
					this.reactX(y);
				} else {
					this.reactY(y);
				}
			}
		}
		this.y += this.dy * this.speed;
		this.animList.forEach(anim => {
			anim.next(this.dir);
		});
		this.checkActivityArea();
		return this.trigger(target);
	}

	drawCircle(ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.fillStyle = this.fillStyle;
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
		ctx.fill();
		ctx.restore();
	}

	drawHitPoint(ctx) {
		if (this.hitPoint < 100000) {
			ctx.save();
			ctx.fillStyle = 'white';
			ctx.fillText(this.hitPoint, 0, 20);
			ctx.restore();
		}
	}

	drawNormal(ctx) {
		this.animList.forEach(anim => {
			anim.draw(ctx);
		});
		if (this.animList.length == 0 && this.fillStyle) {
			this.drawCircle(ctx);
		}
//		this.drawHitPoint(ctx);
//		this.region.draw(ctx);
	}

	drawAbsorb(ctx) {
		ctx.fillStyle = 'rgba(255, 200, 0, 0.4)';
		ctx.save();
		ctx.translate(this.absorbedTarget.x, this.absorbedTarget.y);
		ctx.beginPath();
		ctx.arc(0, 0, 5, 0, Math.PI2);
		ctx.fill();
		ctx.restore();
		this.absorbedTarget = null;
	}

	drawExplosion(ctx) {
		let size = this.explosion;

		ctx.save();
		ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
		ctx.beginPath();
		ctx.arc(0, 0, size, 0, Math.PI2, false);
		ctx.fill();
		ctx.restore();
	}

	/**
	 * Draw.
	 * @param ctx
	 */
	draw(ctx) {
		if (this.isGone) {
			return;
		}
		ctx.save();
		ctx.translate(this.x, this.y);
		if (0 < this.explosion) {
			this.drawExplosion(ctx);
		} else {
			this.drawNormal(ctx);
		}
		ctx.restore();
		if (this.absorbedTarget) {
			this.drawAbsorb(ctx);
		}
	}

	/**
	 * 当たり判定.
	 * @param target
	 * @returns {Boolean}
	 */
	isHit(target) {
		if (this.isGone || 0 < this.explosion || 0 < target.explosion) {
			return false;
		}
		if (this.region.isHit(target.region)) {
			this.fate(target);
			target.fate(this);
			return true;
		}
		return false;
	}

	calcDistance(target) {
		let wX = this.x - target.x;
		let wY = this.y - target.y;

		return Math.sqrt(wX * wX + wY * wY);
	}

	/**
	 * やられ.
	 */
	fate(target = null) {
		if (target != null && target.isGone || this.isGone || this.explosion) {
			return;
		}
		this.hitPoint--;
		if (0 < this.hitPoint) {
			this.absorb(target);
			return;
		}
		this.explosion = Actor.MAX_EXPLOSION;
		let pan = Product.Instance.calcPan(this);
		AudioMixer.INSTANCE.play(this.sfx, .2, false, pan);
	}

	absorb(target) {
		this.absorbed = true;
		this.absorbedTarget = target;
		if (this.sfxAbsorb) {
			let pan = Product.Instance.calcPan(this);
			AudioMixer.INSTANCE.play(this.sfxAbsorb, .3, false, pan);
		}
	}

	init() {
		// console.log('Actor#init:' + this.id + '/' + this.className + ':' + this.seq);
		this.region = new Region(this);
		this.setRect(this.width, this.height);
		this.actorVisualList = this.actorVisualList.map(v => ActorVisual.create(v, this));
		return this;
	}

	static create(rec) {
		return Object.assign(new Actor(), rec).init();
	}
}
Actor.MAX_EXPLOSION = 12;
Actor.DEG_STEP = Math.PI / 180;
Actor.Type = {
	None: 0,
	Ship: 1,
	Shot: 16,
	Missile: 32,
	Capsule: 48,
	Bullet: 64,
	Material: 80,
	Enemy: 128,
	Formation: 192,
	Boss: 224,
}
//List = { Enemy, Formation, Boss, Material, Bullet, Capsule, Shot, Missile, Ship };
Actor.TypeList = [
	'None',
	'Enemy',
	'Formation',
	'Boss',
	'Material',
	'Bullet',
	'Capsule',
	'Shot',
	'Missile',
	'Ship',
];
Actor.ActivityAreaType = {
	FREEDOM: 0,
	RESTRICTION: 1,
	EJECT: 2,
};
Actor.CollidingWallType = {
	THROUGH: 0,
	SMASH: 1,
	BOUNCE: 2,
	EJECT: 4,
	CRUSH: 8,
	SMASH_CRUSH: 1 | 8,
};

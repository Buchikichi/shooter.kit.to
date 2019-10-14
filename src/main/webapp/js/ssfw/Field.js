/**
 * Field.
 */
class Field extends Matter {
	constructor(view) {
		super(0, 0);
		this.setRect(view.width, view.height);
		this.actorList = [];
		this.enemyCycle = 0;
		this.setupLandform(view);
		Field.Instance = this;
	}

	get isMoving() {
		return this.phase == Field.PHASE.NORMAL;
	}

	setupLandform(view) {
		this.landform = new Landform(view.canvas);
	}

	_reset() {
		this.phase = Field.PHASE.NORMAL;
		this.ship = new Ship(100, 100);
		this.ship.reset();
		this.ship.enter();
		this.actorList = [this.ship];
		this.hibernate = Field.MAX_HIBERNATE;
		Product.Instance.stage.map.mapVisualList.forEach(v => this.actorList.push(v));
	}

	reset() {
		this.landform.reset();
		this._reset();
	}

	retry() {
		this.landform.retry();
		this._reset();
	}

	calcPan(x) {
		return (x - this.hW) / this.hW;
	}

	move() {
		if (this.phase == Field.PHASE.BOSS) {
			return;
		}
		if (!Product.Instance.stage) {
			return;
		}
		Product.Instance.stage.scanEvent().forEach(obj=> {
			let enemy;

			if (obj.formation) {
				enemy = new Formation(obj.x, obj.y).setup(obj.type, 8);
			} else {
				enemy = new obj.type(obj.x, obj.y);
			}
			this.actorList.push(enemy);
		});
		let next = this.landform.forward(this.ship);

		if (Product.Instance.isGameOver) {
			return;
		}
		if (next == Landform.NEXT.NOTICE) {
			AudioMixer.INSTANCE.fade();
			Product.Instance.stage.notice();
		} else if (next == Landform.NEXT.ARRIV) {
			this.phase = Field.PHASE.BOSS;
			Product.Instance.stage.toBossMode();
		} else if (next == Landform.NEXT.PAST) {
			Product.Instance.nextStage();
		}
		if (Field.MIN_LOOSING_RATE < this.loosingRate) {
			let step = this.loosingRate / 10000;

			this.loosingRate -= step;
		}
	}

	draw(ctx) {
		let field = this;
		let ship = this.ship;
		let shotList = [];
		let enemyList = [];
		let validActors = [];
		let score = 0;

		this.actorList.sort(function(a, b) {
			return a.z - b.z;
		});
		this.actorList.forEach(actor => {
			if (actor.isGone) {
				return;
			}
			if (actor instanceof Bullet) {
				actor.isHit(ship);
			} else if (actor instanceof Enemy) {
				actor.triggered = parseInt(Math.random() * field.loosingRate / 10) == 0;
				actor.isHit(ship);
				enemyList.push(actor);
			} else if (actor instanceof Shot || actor instanceof Missile) {
				shotList.push(actor);
			}
			let child = actor.move(ship);

			if (child instanceof Array) {
				child.forEach(enemy => {
					validActors.push(enemy);
				});
			}
			field.landform.effect(actor);
			field.landform.hitTest(actor);
			actor.draw(ctx);
			validActors.push(actor);
			if (actor.explosion && actor.score) {
				score += actor.score;
				actor.score = 0;
			}
		});
		shotList.forEach(shot => {
			enemyList.forEach(enemy => enemy.isHit(shot));
		});
		if (this.phase == Field.PHASE.BOSS && enemyList.length == 0) {
			this.phase = Field.PHASE.NORMAL;
			AudioMixer.INSTANCE.fade();
		}
		this.actorList = validActors;
		if (Product.Instance) {
			Product.Instance.score += score;
			if (!Product.Instance.isGameOver && ship && ship.isGone) {
				AudioMixer.INSTANCE.stop();
				if (0 < --this.hibernate) {
					return;
				}
				if (0 < --Product.Instance.shipRemain) {
					this.retry();
//++Product.Instance.shipRemain;
				}
			}
		}
	}
}
Field.MAX_ENEMIES = 100;
Field.ENEMY_CYCLE = 10;
Field.MIN_LOOSING_RATE = 1;
Field.MAX_LOOSING_RATE = 20000;
Field.MAX_HIBERNATE = Actor.MAX_EXPLOSION * 5;
Field.PHASE = {
	NORMAL: 0,
	BOSS: 1
};

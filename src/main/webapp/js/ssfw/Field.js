/**
 * Field.
 */
class Field extends Matter {
	constructor(view) {
		super(0, 0);
		this.setRect(view.width, view.height);
		this.actorList = [];
		this.setupLandform(view);
		Field.Instance = this;
	}

	setupLandform(view) {
		this.landform = new Landform(view.canvas);
	}

	_reset() {
		this.ship = new Ship(100, 100);
		this.ship.reset();
		this.ship.enter();
		this.actorList = [this.ship];
		this.hibernate = Field.MAX_HIBERNATE;
		Product.Instance.stage.map.mapVisualList.forEach(v => this.actorList.push(v));
	}

	retry() {
		this.landform.retry();
		this._reset();
	}

	calcPan(x) {
		return (x - this.hW) / this.hW;
	}

	move() {
		if (!Product.Instance.stage) {
			return;
		}
		if (Product.Instance.stage.phase == Stage.PHASE.BOSS) {
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
			Product.Instance.stage.toBossMode();
		} else if (next == Landform.NEXT.PAST) {
			Product.Instance.nextStage();
		}
		if (Product.MIN_LOOSING_RATE < Product.Instance.loosingRate) {
			let step = Product.Instance.loosingRate / 10000;

			Product.Instance.loosingRate -= step;
		}
	}

	draw(ctx) {
		let field = this;
		let shipList = this.actorList.filter(a => a instanceof Ship);
		let ship = 0 < shipList.length ? shipList[0] : new Actor(); // FIXME:
		let shotList = [];
		let enemyList = [];
		let validActors = [];
		let score = 0;

		this.actorList.sort((a, b) => a.z - b.z);
		this.actorList.forEach(actor => {
			if (actor.isGone) {
				return;
			}
			if (actor instanceof Bullet) {
				shipList.forEach(s => actor.isHit(s));
			} else if (actor instanceof Enemy) {
				enemyList.push(actor);
			} else if (actor instanceof Shot || actor instanceof Missile) {
				shotList.push(actor);
			}
			let child = actor.move(ship);

			if (child instanceof Array) {
				child.forEach(enemy => validActors.push(enemy));
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
		enemyList.forEach(enemy => {
			enemy.triggered = parseInt(Math.random() * Product.Instance.loosingRate / 10) == 0;
			shipList.forEach(s => enemy.isHit(s));
			shotList.forEach(s => enemy.isHit(s));
		});
		if (Product.Instance.stage && Product.Instance.stage.phase == Stage.PHASE.BOSS && enemyList.length == 0) {
			Product.Instance.stage.phase = Stage.PHASE.NORMAL;
			AudioMixer.INSTANCE.fade();
		}
		this.actorList = validActors;
		if (Product.Instance) {
			Product.Instance.score += score;
			if (!Product.Instance.isGameOver && shipList.every(s => s.isGone)) {
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
Field.MAX_HIBERNATE = Actor.MAX_EXPLOSION * 5;

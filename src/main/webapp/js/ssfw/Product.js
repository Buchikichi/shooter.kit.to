/**
 * Product.js
 */
class Product extends Matter {
	constructor() {
		super();
		this.maxShip = 7;
		this.maxHibernate = 60;

		this.shipRemain = 0;
		this.score = 0;
		this.hiscore = 0;
		this.stageNum = 0;
		this.stage = null;
		this.performersList = [];
	}

	get isGameOver() {
		return this.shipRemain <= 0;
	}

	calcPan(matter) {
		return (matter.x - this.hW) / this.hW;
	}

	startGame() {
		this.increase();
		this.loosingRate = Product.MAX_LOOSING_RATE;
		this.score = 0;
		this.shipRemain = this.maxShip;
		this.stageNum = 0;
		this.nextStage();
		this._reset();
	}

	increase() {
		new ProductEntity().increase(this.id).then(rec => {
			console.log('Product#increase:' + rec.ok);
		});
	}

	nextStage() {
		if (this.ship) {
console.log('nextStage this.ship.x:' + this.ship.x);
			let x = this.ship.x - this.stage.map.x;
			let y = this.ship.y - this.stage.map.y;
			this.ship.x = x;
			this.ship.y = y;
console.log('this.ship.x:' + x);
		}
		let stage = this.detailList[this.stageNum];

		this.stage = Object.assign(stage);
		Field.Instance.landform.loadStage(this.stage);
		this.stageNum++;
		if (this.detailList.length <= this.stageNum) {
			this.stageNum = 0;
		}
		// Remove MapVisual of previous stage.
		this.performersList = this.performersList.filter(actor => !(actor instanceof MapVisual));
		this.stage.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	_reset() {
		this.ship = new Ship(-400, 100);
		this.ship.stage = this.stage;
		this.ship.reset();
		this.ship.enter();
		this.performersList = [this.ship];
		this.stage.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	retry() {
		Field.Instance.landform.retry();
		this.stage.retry();
		this._reset();
	}

	move() {
		if (!this.stage) {
			return;
		}
		if (this.stage.phase == Stage.PHASE.BOSS) {
			return;
		}
		this.stage.scanEvent().forEach(enemy => this.performersList.push(enemy));
		let next = Field.Instance.landform.forward(this.ship);

		if (this.isGameOver) {
			return;
		}
		if (next == Landform.NEXT.NOTICE) {
			AudioMixer.INSTANCE.fade();
			this.stage.notice();
		} else if (next == Landform.NEXT.ARRIV) {
			this.stage.toBossMode();
		} else if (next == Landform.NEXT.PAST) {
			this.nextStage();
		}
		if (Product.MIN_LOOSING_RATE < this.loosingRate) {
			let step = this.loosingRate / 10000;

			this.loosingRate -= step;
		}
	}

	draw(ctx) {
		if (!this.stage) {
			return;
		}
		let shipList = this.performersList.filter(a => a instanceof Ship);
		let ship = 0 < shipList.length ? shipList[0] : new Actor(); // FIXME:
		let shotList = [];
		let enemyList = [];
		let validActors = [];
		let score = 0;

		this.performersList.sort((a, b) => a.z - b.z);
		this.performersList.forEach(actor => {
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
				child.forEach(c => {c.stage = this.stage; validActors.push(c);});
			}
			this.stage.effect(actor);
//			Field.Instance.landform.effect(actor);
//			Field.Instance.landform.hitTest(actor);
			validActors.push(actor);
			if (actor.explosion && actor.score) {
				score += actor.score;
				actor.score = 0;
			}
		});
		enemyList.forEach(enemy => {
			enemy.triggered = parseInt(Math.random() * this.loosingRate / 10) == 0;
			shipList.forEach(s => enemy.isHit(s));
			shotList.forEach(s => enemy.isHit(s));
		});
		if (this.stage.phase == Stage.PHASE.BOSS && enemyList.length == 0) {
			this.stage.phase = Stage.PHASE.NORMAL;
			AudioMixer.INSTANCE.fade();
		}
		this.performersList = validActors;
		this.score += score;
		if (!this.isGameOver && shipList.every(s => s.isGone)) {
			AudioMixer.INSTANCE.stop();
			if (--this.stage.hibernate <= 0) {
				if (0 < --this.shipRemain) {
					this.retry();
//++this.shipRemain;
				}
			}
		}
		// Draw
		ctx.save();
		ctx.translate(this.stage.fg.x, 0);
		this.performersList.forEach(actor => actor.draw(ctx));
		ctx.restore();
		this.drawForDebug(ctx);
	}

	drawForDebug(ctx) {
		let y = 20;

		ctx.save();
		ctx.strokeStyle = 'white';
		ctx.strokeText('progress:' + this.stage.progress, 10, y += 20);
		ctx.strokeText('fg.x:' + this.stage.fg.x, 10, y += 20);
		ctx.strokeText('ship.x:' + this.ship.x, 10, y += 20);
		ctx.restore();
	}

	registerScore() {
		let formData = new FormData();

		formData.append('productId', this.id);
		formData.append('score', this.score);
		formData.append('name', '');
		new ScoreEntity().register(formData).then(rec => {
			console.log('registerScore:' + rec.ok);
		});
	}

	init() {
		let stageList = [];

		this.setRect(this.width, this.height);
		this.detailList.forEach(stage => {
			stage.product = this;
			stageList.push(Stage.create(stage))
		});
		this.detailList = stageList;
		if (0 < this.scoreList.length) {
			this.hiscore = this.scoreList[0].score;
		}
		return this;
	}

	static create(productId) {
		return new ProductEntity().select(productId).then(product => {
			Mediaset.create(product.mediaset).load();
			Product.Instance = Object.assign(new Product(), product);
			return Product.Instance.init();
		});
	}
}
Product.Instance = null;
Product.MIN_LOOSING_RATE = 1;
Product.MAX_LOOSING_RATE = 20000;

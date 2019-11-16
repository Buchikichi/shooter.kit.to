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
console.log('Product#nextStage:' + this.stageNum);
if (this.ship) {
	console.log('ship_' + this.ship.x + '/' + this.ship.y);
}
		let stage = this.detailList[this.stageNum];

		// Remove MapVisual of previous stage.
		this.performersList = this.performersList.filter(actor => !(actor instanceof MapVisual));
		this.performersList.forEach(actor => {
			actor.x -= actor._stage.map.x;
			actor.y -= actor._stage.map.y;
		});
if (this.ship) {
	console.log('map:' + this.stage.map.x + '/' + this.stage.map.y);
	console.log('ship:' + this.ship.x + '/' + this.ship.y);
}
		// Create next stage.
		this.stage = Object.assign(stage);
		Field.Instance.landform.loadStage(this.stage);
		this.stageNum++;
		if (this.detailList.length <= this.stageNum) {
			this.stageNum = 0;
		}
		this.performersList.forEach(actor => {
			actor.x += this.stage.map.x;
			actor.y += this.stage.map.y;
			actor._stage = this.stage
		});
		// Add MapVisual
		this.stage.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	selectStage(stageId) {
		this.detailList.forEach(stage => {
			if (stage.id != stageId) {
				return;
			}
			this.stage = StageEditor.create(stage);
		});
//		Field.Instance.landform.loadStage(this.stage);
		this.stage.map.mapVisualList.forEach(v => this.performersList.push(v));
	}

	_reset() {
		this.ship = new Ship(-400, 100);
		this.ship._stage = this.stage;
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
				child.forEach(c => {c._stage = this.stage; validActors.push(c);});
			}
			this.stage.effect(actor);
//			Field.Instance.landform.effect(actor);
			validActors.push(actor);
			if (actor.explosion && actor.score) {
				score += actor.score;
				actor.score = 0;
			}
		});
		this.stage.effectMap(ship);
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
		ctx.translate(this.stage.fg.x, this.stage.fg.y);
		this.performersList.forEach(actor => actor.draw(ctx));
		this.stage.draw(ctx);
		ctx.restore();
		this.drawForDebug(ctx);
	}

	drawForDebug(ctx) {
		let x = 2;
		let y = 20;
		let actors = this.performersList.filter(actor => !(actor instanceof MapVisual));
		let mainVisual = this.stage.map._mainVisual;

		ctx.save();
		ctx.strokeStyle = 'white';
		ctx.strokeText('actors:' + actors.length + (0 < actors.length ? '|' + actors[actors.length - 1].constructor.name: ''), x, y += 20);
		ctx.strokeText('progress:' + parseInt(this.stage.progress) + '/' + parseInt(mainVisual.progressH), x, y += 20);
		ctx.strokeText('map:' + parseInt(mainVisual.x) + '/' + mainVisual.y, x, y += 20);
		if (this.ship) {
			let fg = this.ship._stage.map;
			let shipX = parseInt(this.ship.x/* - fg.x*/);
			let shipY = parseInt(this.ship.y + mainVisual.y);
			ctx.strokeText('ship:' + shipX + '/' + shipY, x, y += 20);
		}
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

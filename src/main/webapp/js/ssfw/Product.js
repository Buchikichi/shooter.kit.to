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
	}

	get isGameOver() {
		return this.shipRemain <= 0;
	}

	calcPan(matter) {
		// between -1 and 1
		let hW = this.width / 2;
		let pos = matter.x + this.stage.map._mainVisual.x - hW;

		// console.log('Product#calcPan:' + pos / hW + '/pos:' + pos);
		return pos / hW;
	}

	startGame() {
		this.increase();
		this.loosingRate = Product.MAX_LOOSING_RATE;
		this.score = 0;
		this.shipRemain = this.maxShip;
		this.stageNum = 0;
		this.nextStage();
	}

	increase() {
		new ProductEntity().increase(this.id).then(rec => {
			console.log('Product#increase:' + rec.ok);
		});
	}

	nextStage() {
		console.log('Product#nextStage:' + this.stageNum);
		let isFirst = !this.stage;
		let stage = this.stageList[this.stageNum];
		let performersList = isFirst ? [] : this.stage.removeMapVisual();

		// Create next stage.
		this.stage = Object.assign(stage, { performersList: performersList });
		this.stage.start(isFirst);
		this.stageNum++;
		if (this.stageList.length <= this.stageNum) {
			this.stageNum = 0;
		}
	}

	selectStage(stageId) {
		this.stageList.forEach(stage => {
			if (stage.id != stageId) {
				return;
			}
			this.stage = StageEditor.create(stage);
		});
//		this.stage.map.mapVisualList.forEach(v => this.performersList.push(v));
		this.stage.start();
	}

	move() {
		if (!this.stage) {
			return;
		}
		if (Transition.Instance.waitForDrawing) {
			return;
		}
		this.stage.move();
		if (this.isGameOver) {
			return;
		}
		if (this.stage.phase == Stage.PHASE.NEXT_STAGE) {
			this.nextStage();
		}
		if (Product.MIN_LOOSING_RATE < this.loosingRate) {
			let step = this.loosingRate / 10000;

			this.loosingRate -= step;
		}

		let shipList = this.stage.performersList.filter(a => a instanceof Ship);
		let ship = 0 < shipList.length ? shipList[0] : new Actor(); // FIXME:
		let shotList = [];
		let enemyList = [];
		let validActors = [];
		let score = 0;

		this.stage.performersList.forEach(actor => {
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
			console.log('Defeated the boss.');
			this.stage.phase = Stage.PHASE.NORMAL;
			this.stage.scroll = this.stage.roll;
			AudioMixer.INSTANCE.fade();
		}
		this.stage.performersList = validActors;
		this.score += score;
		if (this.stage.phase == Stage.PHASE.INIT) {
			return;
		}
		if (!this.isGameOver && shipList.every(s => s.isGone)) {
			console.log('Product#move crash.');
			if (this.crashBgm == Product.CrashHandling.Bgm.Stop) {
				AudioMixer.INSTANCE.stop();
			}
			if (--this.stage.hibernate <= 0) {
				if (0 < --this.shipRemain) {
					this.stage.retry();
//++this.shipRemain;
				}
			}
		}
	}

	draw(ctx) {
		if (!this.stage) {
			return;
		}
		// Draw
		ctx.save();
		ctx.translate(this.stage.fg.x, this.stage.fg.y);
		this.stage.draw(ctx);
		ctx.restore();
		this.drawForDebug(ctx);
	}

	drawForDebug(ctx) {
		let x = 2;
		let y = 20;
		let actors = this.stage.performersList.filter(actor => !(actor instanceof MapVisual));
		let actorNames = [];
		let mainVisual = this.stage.map._mainVisual;

		actors.forEach(actor => {
			if (10 <= actorNames.length || !(actor instanceof Enemy)) {
				return;
			}
			actorNames.push(actor.constructor.name);
		});
		ctx.save();
		ctx.strokeStyle = 'white';
		ctx.strokeText('phase:' + this.stage.phase + '/progress:' + parseInt(this.stage.progress), x, y += 20);
		ctx.strokeText('actors:' + actors.length + (0 < actors.length ? '|' + actorNames.join(',') : ''), x, y += 20);
		ctx.strokeText('map:' + parseInt(-mainVisual.x) + '/' + mainVisual.y, x, y += 20);

		let ship = this.stage.performersList.find(a => a instanceof Ship);

		if (ship) {
			let shipX = parseInt(ship.x + mainVisual.x);
			let shipY = parseInt(ship.y + mainVisual.y);
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
		this.stageList.forEach(stage => {
			stage._product = this;
			stageList.push(Stage.create(stage))
		});
		this.stageList = stageList;
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
Product.CrashHandling = {
	Bgm: {
		Keep: 0, Stop: 1, Fade: 2,
	}
};

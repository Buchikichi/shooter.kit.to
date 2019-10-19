/**
 * Product.js
 */
class Product extends Matter {
	constructor() {
		super();
		this.maxShip = 7;
		this.shipRemain = 0;
		this.score = 0;
		this.hiscore = 0;
		this.stageNum = 0;
		this.stage = null;
	}

	get isGameOver() {
		return this.shipRemain <= 0;
	}

	startGame() {
		this.increase();
		this.loosingRate = Product.MAX_LOOSING_RATE;
		this.score = 0;
		this.shipRemain = this.maxShip;
		this.stageNum = 0;
		this.nextStage();
		Field.Instance._reset();
	}

	increase() {
		new ProductEntity().increase(this.id).then(rec => {
			console.log('Product#increase:' + rec.ok);
		});
	}

	nextStage() {
		let stage = this.detailList[this.stageNum];

		this.stage = Object.assign(stage);
		Field.Instance.landform.loadStage(this.stage);
		this.stageNum++;
		if (this.detailList.length <= this.stageNum) {
			this.stageNum = 0;
		}
		let actorList = Field.Instance.actorList.filter(actor => !(actor instanceof MapVisual));
		Field.Instance.actorList = actorList;
		this.stage.map.mapVisualList.forEach(v => Field.Instance.actorList.push(v));
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

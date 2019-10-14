/**
 * Product.js
 */
class Product {
	constructor() {
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
		Field.Instance.loosingRate = Field.MAX_LOOSING_RATE;
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

		this.stage = stage;
		Field.Instance.landform.loadStage(stage);
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

		this.detailList.forEach(detail => stageList.push(Stage.create(detail)));
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

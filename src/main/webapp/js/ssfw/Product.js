/**
 * Product.js
 */
class Product {
	constructor() {
		this.maxShip = 7;
		this.shipRemain = 0;
		this.score = 0;
		this.hiscore = 0;
	}

	get isGameOver() {
		return this.shipRemain <= 0;
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

	increase() {
		new ProductEntity().increase(this.id).then(rec => {
			console.log('Product#increase:' + rec.ok);
		});
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

	static create(productId) {
		return new ProductEntity().select(productId).then(product => {
			Mediaset.create(product.mediaset).load();
			Product.Instance = Object.assign(new Product(), product);
			return Product.Instance.init();
		});
	}
}
Product.Instance = null;

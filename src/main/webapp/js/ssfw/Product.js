/**
 * Product.js
 */
class Product {
	constructor() {
	}

	init() {
		let stageList = [];

		this.detailList.forEach(detail => stageList.push(Stage.create(detail)));
		this.detailList = stageList;
		return this;
	}

	increase() {
		new ProductEntity().increase(this.id).then(rec => {
			console.log('Product#increase:' + rec.ok);
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

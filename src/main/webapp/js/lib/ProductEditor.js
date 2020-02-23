class ProductEditor extends Product {
	constructor() {
		super();
	}

    updateStageSeq(list) {
        this.stageList = list.map(rec => {
            let stage = this.stageList.find(s => s.id == rec.id);

            stage.seq = rec.seq;
            return stage;
        });
    }

    save() {
		console.log('ProductEditor#save');
		return new ProductEntity().save(this);
	}

	static create(productId) {
		return new ProductEntity().select(productId).then(product => {
			Mediaset.create(product.mediaset).load();
			Product.Instance = Object.assign(new ProductEditor(), product);
			return Product.Instance.init();
		});
	}
}

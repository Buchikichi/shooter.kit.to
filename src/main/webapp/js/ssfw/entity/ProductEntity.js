/**
 * プロダクト.
 */
class ProductEntity extends EntityBase {
	constructor() {
		super('product');
	}

	/**
	 * プレイ回数加算.
	 */
	increase(id) {
		return this.fetch('/increase/'+ id).then(res => {
			return res.json();
		});
	}
}

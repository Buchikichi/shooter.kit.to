/**
 * プロダクト.
 */
class ProductEntity extends EntityBase {
	constructor() {
		super('product');
	}

	saveMap(formData) {
		return AjaxUtils.post('/detail/save', formData);
	}

	/**
	 * プレイ回数加算.
	 */
	increase(id) {
		let formData = new FormData();

		formData.append('id', id);
		return AjaxUtils.post('/product/increase', formData);
	}
}

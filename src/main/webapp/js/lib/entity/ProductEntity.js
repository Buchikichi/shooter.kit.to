/**
 * プロダクト.
 */
class ProductEntity extends EntityBase {
	constructor() {
		super('product');
	}

	/**
	 * プロダクト詳細取得.
	 */
	listActors(id) {
		let formData = new FormData();

		formData.append('id', id);
		return AjaxUtils.post('/product/listActors', formData);
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

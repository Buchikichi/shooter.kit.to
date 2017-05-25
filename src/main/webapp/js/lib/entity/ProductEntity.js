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
	detail(id) {
		let formData = new FormData();

		formData.append('id', id);
		return AjaxUtils.post('/product/selectDetail', formData);
	}

	saveMap(formData) {
		return AjaxUtils.post('/detail/save', formData);
	}
}

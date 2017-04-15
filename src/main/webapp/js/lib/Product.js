/**
 * プロダクト.
 */
class Product extends EntityBase {
	constructor() {
		super();
		this.base = 'product';
	}
//
//	/**
//	 * プロダクト一覧.
//	 */
//	list() {
//		let data = {};
//
//		return $.ajax({
//			type: 'post',
//			url: 'product/list',
//			dataType: 'json',
//			data: data,
//		});
//	}
}

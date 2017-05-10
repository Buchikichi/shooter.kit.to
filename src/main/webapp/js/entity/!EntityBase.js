class EntityBase {
	constructor(base) {
		this.base = base;
	}

	/**
	 * 一覧取得.
	 */
	list(data = {}) {
		return AjaxUtils.post('/' + this.base + '/list', data);
//		return $.ajax({
//			type: 'post',
//			url: '/' + this.base + '/list',
//			dataType: 'json',
//			data: data,
//		});
	}

	/**
	 * レコード取得.
	 */
	select(id) {
		let formData = new FormData();

		formData.append('id', id);
		return AjaxUtils.post('/' + this.base + '/select', formData);
	}

	save(formData) {
		return AjaxUtils.post('/' + this.base + '/save', formData);
//		return $.ajax({
//			type: 'post',
//			url: '/' + this.base + '/save',
//			dataType: 'json',
//			data: formData,
//			processData : false,
//			contentType: false,
//		});
	}
}

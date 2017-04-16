class EntityBase {
	constructor(base) {
		this.base = base;
	}

	/**
	 * 一覧取得.
	 */
	list(data = {}) {
		return $.ajax({
			type: 'post',
			url: '/' + this.base + '/list',
			dataType: 'json',
			data: data,
		});
	}

	/**
	 * レコード取得.
	 */
	select(id) {
		let data = new FormData();

		data.append('id', id);
		return fetch('/' + this.base + '/select', {
			method: 'post',
			body: data,
		}).then(res => {
			return res.json();
		});
//		return $.ajax({
//			type: 'post',
//			url: '/' + this.base + '/select',
//			dataType: 'json',
//			data: data,
//		});
	}

	save(form) {
		let formData = new FormData(form);

		return $.ajax({
			type: 'post',
			url: '/' + this.base + '/save',
			dataType: 'json',
			data: formData,
			processData : false,
			contentType: false,
		});
	}
}

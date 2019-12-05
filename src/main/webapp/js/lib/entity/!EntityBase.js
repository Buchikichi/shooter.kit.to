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

	save(data) {
		let appears = [];

		return fetch('/' + this.base + '/save', {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=UTF-8'},
			body: JSON.stringify(data, (key, value) => {
				if (key.startsWith('_')) {
					return;
				}
				if (value != null && typeof value == 'object') {
					if (0 <= appears.indexOf(value)) {
//console.log('appears:' + key);
//console.log(value);
						return;
					}
					appears.push(value);
				}
				return value;
			}),
			credentials: 'include',
		}).then(res => {
			return res.json();
		});
	}

	saveResource(data) {
		return fetch('/' + this.base + '/save', {
			method: 'post',
			body: data,
			credentials: 'include',
		}).then(res => {
			return res.json();
		});
	}
}

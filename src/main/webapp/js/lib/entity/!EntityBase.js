class EntityBase {
	constructor(base) {
		if (base) {
			this.base = base;
		} else {
			this.base = this.constructor.name.slice(0, -('Entity'.length)).toLowerCase();
		}
	}

	/**
	 * 一覧取得.
	 */
	list(data = {}) {
		return fetch('/' + this.base + '/list', {
			method: 'POST',
			headers: {'Content-Type': 'application/json;charset=UTF-8'},
			body: JSON.stringify(data),
			credentials: 'include',
		}).then(res => {
			return res.text();
		}).then(text => {
			return new DOMParser().parseFromString(text, 'text/html');
		});
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

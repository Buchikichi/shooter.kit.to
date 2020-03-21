class EntityBase {
	constructor(base) {
		if (base) {
			this.base = base;
		} else {
			this.base = this.constructor.name.slice(0, -('Entity'.length)).toLowerCase();
		}
	}

	fetch(path, body = '{}') {
		let headers = { 'Content-Type': 'application/json;charset=UTF-8' };
		let csrf = document.querySelector('[name*=CSRF]');

		headers[csrf.name] = csrf.value;
		return fetch('/' + this.base + path, {
			method: 'POST',
			headers: headers,
			body: body,
			credentials: 'include',
		});
	}

	list(data = {}) {
		return this.fetch('/list', JSON.stringify(data)).then(res => {
			return res.text();
		}).then(text => {
			return new DOMParser().parseFromString(text, 'text/html');
		});
	}

	select(id) {
		return this.fetch('/select/'+ id).then(res => {
			return res.json();
		});
	}

	save(data) {
		let appears = [];
		let body = JSON.stringify(data, (key, value) => {
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
		});

		return this.fetch('/save', body).then(res => {
			return res.json();
		});
	}

	saveResource(formData) {
		return fetch('/' + this.base + '/save', {
			method: 'post',
			body: formData,
			credentials: 'include',
		}).then(res => {
			return res.json();
		});
	}
}

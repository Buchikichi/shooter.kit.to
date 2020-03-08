class ActorEntity extends EntityBase {
	constructor() {
		super('actor');
	}

	list(data) {
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
}

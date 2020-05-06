class UtilsEntity extends EntityBase {
	constructor() {
		super('utils');
	}

	uuid() {
		return this.fetch('/uuid/').then(res => {
			return res.json();
		}).then(json => {
			return json.result;
		});
	}
}

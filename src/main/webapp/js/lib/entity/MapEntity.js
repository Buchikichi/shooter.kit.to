class MapEntity extends EntityBase {
	constructor() {
		super('map');
	}

	saveMap(formData) {
		return AjaxUtils.post('/' + this.base + '/saveMap', formData);
//		return fetch('/' + this.base + '/saveMap', {
//			method: 'post',
//			body: formData,
//			credentials: 'include',
//		}).then(res => {
//			return res.json();
//		});
	}
}

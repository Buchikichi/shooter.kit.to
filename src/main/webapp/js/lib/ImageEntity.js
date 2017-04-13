class ImageEntity extends EntityBase {
	constructor() {
		super();
		this.base = 'image';
	}
//
//	list(keyword) {
//		let data = {keyword:keyword};
//
//		return $.ajax({
//			type: 'post',
//			url: '/' + this.base + '/list',
//			dataType: 'json',
//			data: data,
//		});
//	}
//
//	save(form) {
//		let formData = new FormData(form);
//
//		return $.ajax({
//			type: 'post',
//			url: '/' + this.base + '/save',
//			dataType: 'json',
//			data: formData,
//			processData : false,
//			contentType: false,
//		});
//	}
}

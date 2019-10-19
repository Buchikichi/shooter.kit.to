/**
 * Repository.<br/>
 * 先読みをする貯蔵庫.
 * @author Hidetaka Sasai
 */
class Repository {
	constructor() {
		this.max = 0;
		this.loaded = 0;
		this.dic = {};
		this.reserved = {};
		this.type = 'json';
	}

	isComplete() {
		return 0 < this.max && this.max == this.loaded;
	}

	reserve(key, name = null, contentType = '') {
		if (key == null || key.length == 0) {
			return;
		}
		if (key in this.reserved) {
//console.log('Already exist:' + key);
			return;
		}
		this.reserved[key] = true;
		this.load(key, name, contentType);
	}

	makeName(key) {
		return key;
	}

	load(key, name, contentType) {
		let request = new XMLHttpRequest();
		let path = this.makeName(key);
		let isJson = this.type == 'json';

		this.max++;
		request.open('GET', path, true);
		if (!isJson) {
	//console.log(path + '::' + this.type);
			request.responseType = this.type;
		}
		request.addEventListener('loadend', ()=> {
			let data = request.response;

			if (isJson) {
				data = JSON.parse(data);
			}
			this.onload(key, name, data);
//			console.log('load:' + key);
		});
		request.send();
	}

	onload(key, name, data) {
		this.dic[key] = data;
		if (name) {
			this.dic[name] = data;
		}
		this.done();
	}

	done() {
		this.loaded++;
	}

	checkLoading(callback) {
		return new Promise(resolve => {
			let checkLoading = ()=> {
				if (this.isComplete()) {
					resolve();
					return;
				}
				callback();
				setTimeout(checkLoading, 30);
			};
			checkLoading();
		});
	}
}

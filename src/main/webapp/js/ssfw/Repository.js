/**
 * Repository.<br/>
 * 先読みをする貯蔵庫.
 * @author Hidetaka Sasai
 */
function Repository() {
	this.max = 0;
	this.loaded = 0;
	this.dic = {};
	this.reserved = {};
	this.type = 'json';
}

Repository.prototype.isComplete = function() {
	return 0 < this.max && this.max == this.loaded;
};

Repository.prototype.reserve = function(...list) {
	let repository = this;

	list.forEach(function(key) {
		if (key == null || key.length == 0) {
			return;
		}
		if (key in repository.reserved) {
//console.log('Already exist:' + key);
			return;
		}
		repository.reserved[key] = true;
		repository.load(key);
	});
};

Repository.prototype.makeName = function(key) {
	return key;
};

Repository.prototype.load = function(key) {
	let repository = this;
	let request = new XMLHttpRequest();
	let name = this.makeName(key);
	let isJson = this.type == 'json';

	this.max++;
	request.open('GET', name, true);
	if (!isJson) {
//console.log(name + '::' + this.type);
		request.responseType = this.type;
	}
	request.addEventListener('loadend', ()=> {
		let data = request.response;

		if (isJson) {
			data = JSON.parse(data);
		}
		repository.dic[key] = data;
		repository.onload(key, name, data);
//		console.log('load:' + key);
	});
	request.send();
};

Repository.prototype.onload = function(key, name, data) {
	this.done();
};

Repository.prototype.done = function() {
	this.loaded++;
};

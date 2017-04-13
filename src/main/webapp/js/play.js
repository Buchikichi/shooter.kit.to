document.addEventListener('DOMContentLoaded', ()=> {
	let productId = document.getElementById('productId');

	new Controller();
	Field.load(productId.value, field => {
		Field.Instance = field;
	});
});

class Controller {
	constructor() {
		new KeyPool();
		this.activate();
	}

	activate() {
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		let activation = tm => {
			if (Field.Instance) {
				Field.Instance.draw(tm);
			}
			requestAnimationFrame(activation);
		};
		requestAnimationFrame(activation);
	}
}

class KeyPool {
	constructor() {
		KeyPool.Instance = this;
		this.keys = {};
		window.addEventListener('keydown', event => {
			if (event.key) {
console.log('key[' + event.key + ']');
				this.keys[event.key] = true;
			} else {
				this.keys['k' + event.keyCode] = true;
			}
		});
		window.addEventListener('keyup', event => {
			if (event.key) {
				delete this.keys[event.key];
			} else {
				delete this.keys['k' + event.keyCode];
			}
		});
	}
}

class Field {
	constructor(width, height) {
		let canvas = document.getElementById('canvas');

		this.width = width;
		this.height = height;
		this.ctx = canvas.getContext('2d');
		this.last = 0;
		this.x = 0;
		Field.Instance = this;
		window.addEventListener('resize', ()=>this.resize());
	}

	resize() {
		let canvas = document.getElementById('canvas');
		let winW = window.innerWidth - 4;
		let winH = window.innerHeight - 4;
		let scaleH = winW / this.width;
		let scaleV = winH / this.height;

		this.scale = Math.min(scaleH, scaleV);
		canvas.width = this.width * this.scale;
		canvas.height = this.height * this.scale;
	}

	draw(tm) {
		this.ctx.save();
		this.ctx.scale(this.scale, this.scale);
		this.ctx.clearRect(0, 0, this.width, this.height);

		this.ctx.save();
		this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.2)';
		this.ctx.strokeRect(0, 0, this.width - 1, this.height - 1);
		this.ctx.restore();

		this.ctx.save();
		this.ctx.fillStyle = 'rgba(128, 255, 128, 0.3)';
		this.ctx.fillRect(0, 0, this.x, 8);
		this.ctx.restore();
		this.x++;
		if (60 < this.x) {
			let diff = tm - this.last;

//console.log('diff:' + diff);
			this.x = 0;
			this.last = tm;
		}
		this.ctx.restore();
	}

	static load(id, callback) {
		let req = new XMLHttpRequest();
		let uri = 'select?id=' + id;

		Field.Instance = null;
		req.addEventListener("loadend", evt => {
//console.log(req.response);
			let rec = JSON.parse(req.response);
			let field = new Field(rec.width, rec.height);

			if (callback) {
				callback(field);
			}
			field.resize();
		}, true);
		req.open('GET', uri, true);
		req.send();
	}
}

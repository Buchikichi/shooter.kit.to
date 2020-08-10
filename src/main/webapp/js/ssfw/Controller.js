/**
 * Controller.
 */
class Controller {
	constructor(isEdit = false) {
		this.keys = {};
		this.press = {};
		this.point = {};
		this.touch = false;
		this.init(isEdit);
		Controller.Instance = this;
	}

	init(isEdit) {
		if (!isEdit) {
			window.addEventListener('contextmenu', event => {
				event.preventDefault();
			});
		}
		this.initKeys();
		this.initPointingDevice();
	}

	initKeys() {
		window.addEventListener('keydown', event => {
			if (event.key) {
				if (!this.press[event.key]) {
					this.keys[event.key] = true;
					// console.log('key[' + event.key + ']');
				}
			} else {
				this.keys['k' + event.keyCode] = true;
			}
		});
		window.addEventListener('keyup', event => {
			if (event.key) {
				delete this.keys[event.key];
				delete this.press[event.key];
			} else {
				delete this.keys['k' + event.keyCode];
			}
		});
	}

	initPointingDevice() {
		let canvas = document.getElementById('canvas');
		let end = () => {
			this.touch = false;
			this.point = null;
			this.prev = null;
			this.move = null;
			this.delta = null;
			//console.log('end');
		};

		canvas.addEventListener('mousedown', event => {
			this.touch = true;
			this.point = FlexibleView.Instance.convert(event.clientX, event.clientY);
			this.prev = this.point;
			this.move = this.point;
			this.delta = { x: 0, y: 0 };
		});
		canvas.addEventListener('mousemove', event => {
			this.move = FlexibleView.Instance.convert(event.clientX, event.clientY);
			if (this.touch) {
				this.point = this.move;

				let dx = this.point.x - this.prev.x;
				let dy = this.point.y - this.prev.y;
				this.delta = { x: dx, y: dy };
			}
		});
		canvas.addEventListener('mouseup', () => end());
		canvas.addEventListener('mouseleave', () => end());

		// touch
		canvas.addEventListener('touchstart', event => {
			let touch = event.touches[0];

			this.touch = true;
			this.point = FlexibleView.Instance.convert(touch.pageX, touch.pageY);
			//console.log('touchstart:' + this.point);
			event.preventDefault();
		});
		canvas.addEventListener('touchmove', event => {
			let touch = event.touches[0];

			this.touch = true;
			this.point = FlexibleView.Instance.convert(touch.pageX, touch.pageY);
			//console.log('touchmove:' + this.point);
		});
		canvas.addEventListener('touchend', () => end());
	}

	decPoint(x, y) {
		this.prev.x += x;
		this.prev.y += y;
	}

	isHit(k) {
		if (this.keys[k]) {
			delete this.keys[k];
			this.press[k] = true;
			return true;
		}
		return false;
	}
}

class Transition {
	constructor() {
		this.type = Transition.Type.Off;
	}

	reset() {
		let canvas = document.getElementById('canvas');

		this.transition = document.getElementById('transition');
		this.ctx = this.transition.getContext('2d');
		this.transition.width = canvas.width;
		this.transition.height = canvas.height;
		this.waitForDrawing = false;
		this.progress = 0;
		this.x = 0;
		this.y = 0;
		this.left = 0;
		this.top = 0;
	}

	play(type, speed) {
		this.reset();
		this.type = type;
		this.speed = speed;
		// console.log('Transition#play type:' + this.type + '/speed:' + this.speed);
		if (this.type == Transition.Type.Spiral) {
			this.playSpiral(8);
			this.waitForDrawing = true;
		}
	}

	playSpiral(size) {
		this.direction = Transition.Direction.Right;
		this.right = size - 1;
		this.bottom = size - 1;
		this.pattern = document.createElement('canvas');
		this.pattern.width = size;
		this.pattern.height = size;

		let ctx = this.pattern.getContext('2d');

		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, this.pattern.width, this.pattern.width);
	}

	draw() {
		if (this.type == Transition.Type.Off) {
			return;
		}
		this.ctx.save();
		this.ctx.clearRect(0, 0, this.transition.width, this.transition.height);
		if (this.type == Transition.Type.Spiral) {
			this.drawSpiral();
		}
		this.ctx.restore();
	}

	drawSpiral() {
		let ctx = this.pattern.getContext('2d');

		for (let c = 0; c < this.speed; c++) {
			ctx.clearRect(this.x, this.y, 1, 1);
			if (this.direction == Transition.Direction.Right) {
				this.x++;
				if (this.right <= this.x) {
					this.right--;
					this.direction = Transition.Direction.Down;
				}
			} else if (this.direction == Transition.Direction.Down) {
				this.y++;
				if (this.bottom <= this.y) {
					this.bottom--;
					this.direction = Transition.Direction.Left;
				}
			} else if (this.direction == Transition.Direction.Left) {
				this.x--;
				if (this.x <= this.left) {
					this.left++;
					this.direction = Transition.Direction.Up;
				}
			} else if (this.direction == Transition.Direction.Up) {
				this.y--;
				if (this.y <= this.top) {
					this.top++;
					this.direction = Transition.Direction.Right;
				}
			}
		}
		if (this.bottom < this.top && this.right < this.left) {
			this.type = Transition.Type.Off;
			this.waitForDrawing = false;
			return;
		}
		this.ctx.fillStyle = this.ctx.createPattern(this.pattern, 'repeat');
		this.ctx.fillRect(0, 0, this.transition.width, this.transition.height);
	}
}
Transition.Type = {
	Off: 0,
	BlackIn: 1,
	WhiteIn: 2,
	Spiral: 3,
	Iris: 4,
}
Transition.Direction = {
	Right: 0, Down: 1, Left: 2, Up: 3,
}
Transition.Instance = new Transition();

class Scenario {
	constructor() {
		this._actor = null;
		this.hasFocus = false;
	}

	includes(pos) {
		let bw = this._stage.map.brickSize;
		let bh = bw / 2;
		let x = this.v * bw + bh;
		let y = this.h * bw + bh;
		let diffX = x - pos.x;
		let diffY = y - pos.y;
		let distance = Math.sqrt(diffX * diffX + diffY * diffY);

		return distance < bh;
	}

	isHit(pos) {
		let bw = this._stage.map.brickSize;
		let bh = bw / 2;
		let x = this.v * bw + bh;
		let y = this.h * bw + bh;

		if (this.target == 'E') {
			let width = this._stage.map.brickSize * 2; // FIXME:
			let hW = width / 2;

			return x - hW <= pos.x && pos.x <= x + hW && y - hW <= pos.y && pos.y <= y + hW;
		}
		let height = this._stage.map._mainVisual.image.height;

		return x - bh <= pos.x && pos.x <= x + bh && 0 <= pos.y && pos.y <= height;
	}

	getActor() {
		if (!this._actor) {
			this._actor = Enemy.getActor(this.number);
			// console.log('this._actor:');
			// console.log(this._actor);
		}
		return this._actor;
	}

	getText() {
		let prefix = this.op;

		if (0 < this.type || 0 < this.number) {
			prefix += ':' + this.type + '.' + this.number;
		}
		if (this.target == 'E') {
			let actor = this.getActor();

			if (actor) {
				this.name = actor.name;
			}
		}
		return prefix + (this.name ? ':' + this.name : '');
	}

	drawBalloon(ctx, pos) {
		ctx.font = 'bold ' + Scenario.Balloon.TextHeight + 'px serif';
		let text = this.getText();
		let measure = ctx.measureText(text);
		let width = measure.width + 8;
		let height = 24;
		let x = pos.x - width / 2;
		let y = pos.y - height - Scenario.Balloon.Margin;
		let left = pos.scrollLeft;
		let right = left + pos.width - width;

		if (x < left) {
			x = left;
		} else if (right < x) {
			x = right;
		}
		// console.log('scrollTop:' + pos.width);
		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width, height);
		ctx.fillStyle = 'black';
		ctx.textBaseline = 'top';
		ctx.fillText(text, x + 4, y + 4);
	}

	drawActor(ctx) {
		let actor = this.getActor();
		let bw = this._stage.map.brickSize;
		let bh = bw / 2;
		let sx = this.v * bw + bh;
		let sy = this.h * bw + bh;

		// if (actor) {
		// 	this._actor.draw(ctx);
		// }
		if (this.op == 'Spw') {
			ctx.fillStyle = 'orange';
		} else {
			ctx.fillStyle = 'tomato';
		}
		ctx.beginPath();
		ctx.arc(sx, sy, bh, 0, Math.PI2);
		ctx.fill();

		if (this.hasFocus) {
			ctx.strokeStyle = 'white';
			ctx.beginPath();
			ctx.arc(sx, sy, bh, 0, Math.PI2);
			ctx.stroke();
		}
	}

	draw(ctx) {
		if (this.target == 'E') {
			this.drawActor(ctx);
			return;
		}
		let width = this._stage.map.brickSize;
		let height = Product.Instance.height;
		let sx = this.v * width;

		ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
		ctx.strokeRect(sx, 0, width, height);
		ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
		ctx.strokeRect(sx + 1, 1, width - 2, height - 2);
		if (this.target == 'm') {
			// Mode
			ctx.fillStyle = 'rgba(255, 100, 100, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
			// this.drawMode(ctx, this);
			return;
		}
		if (this.target == 'e') {
			// Effect
			ctx.fillStyle = 'rgba(100, 255, 100, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
			return;
		}
		if (this.target == 'a') {
			// Audio
			ctx.fillStyle = 'rgba(100, 100, 255, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
		}
	}

	init() {
		if (this.op == 'Apl') {
			let audio = Mediaset.Instance.getAudio(this.type, this.number);

			this.name = audio.name;
		}
		return this;
	}

	static create(rec) {
		return Object.assign(new Scenario(), rec).init();
	}
}
Scenario.Balloon = {
	TextHeight: 16,
	Margin: 4,
	Padding: 4,
}

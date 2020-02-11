class Scenario {
	constructor() {
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

	getText() {
		if (this.target == 'E') {
			let actor = Enemy.getActor(this.number);

			return actor ? actor.name : this.op + ':' + this.number;
		}
		return this.op;
	}

	drawBalloon(ctx, pos) {
		ctx.font = 'bold 16px serif';
		let text = this.getText();
		let measure = ctx.measureText(text);
		let width = measure.width + 8;
		let height = 24;
		let x = pos.x - width / 2;
		let y = pos.y - height;

		ctx.fillStyle = 'white';
		ctx.strokeStyle = 'black';
		ctx.fillRect(x, y, width, height);
		ctx.strokeRect(x, y, width, height);
		ctx.fillStyle = 'black';
		ctx.textBaseline = 'top';
		ctx.fillText(text, x + 4, y + 4);
	}

	draw(ctx) {
	}

	init() {
		return this;
	}

	static create(rec) {
		return Object.assign(new Scenario(), rec).init();
	}
}

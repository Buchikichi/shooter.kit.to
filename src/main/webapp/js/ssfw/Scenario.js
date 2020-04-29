class Scenario {
	constructor() {
		this._actor = null;
		this.hasFocus = false;
	}

	setPos(pos) {
		this.v = pos.x;
		this.h = pos.y;
		if (this._actor) {
			this._actor.x = pos.x;
			this._actor.y = pos.y;
		}
	}

	includes(pos) {
		let bh = this._stage.map.brickSize / 2;
		let diffX = this.x - pos.x;
		let diffY = this.y - pos.y;
		let distance = Math.sqrt(diffX * diffX + diffY * diffY);

		return distance < bh;
	}

	isHit(pos) {
		if (this.type == Scenario.Type.Actor) {
			let x = this.x;
			let y = this.y;
			let hW = this._actor.width / 2;
			let hH = this._actor.height / 2;

			return x - hW <= pos.x && pos.x <= x + hW && y - hH <= pos.y && pos.y <= y + hH;
		}
		let bh = this._stage.map.brickSize / 2;
		let x = this.x + bh;
		// let y = this.y + bh;
		let height = this._stage.map._mainVisual.image.height;

		return x - bh <= pos.x && pos.x <= x + bh && 0 <= pos.y && pos.y <= height;
	}

	getText() {
		let text = [];
		let prefix = this.op;
		let name = this.name ? ':' + this.name : '';

		text.push(prefix + name);
		if (this.type == Scenario.Type.Actor) {
			if (this._actor.belongings) {
				text.push(this._actor.belongings.className);
			}
		}
		return text;
	}

	drawBalloon(ctx, pos) {
		ctx.font = 'bold ' + Scenario.Balloon.TextHeight + 'px serif';
		let text = this.getText();
		let maxText = text.reduce((a, c) => a.length < c.length ? c : a);
		let measure = ctx.measureText(maxText);

		let width = measure.width + 8;
		let height = 24 * text.length;
		let x = pos.x - width / 2;
		let y = pos.y - height - Scenario.Balloon.Margin;
		let left = -this._stage.startPos + pos.scrollLeft;
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
		y += 4;
		text.forEach(s => {
			ctx.fillText(s, x + 4, y);
			y += Scenario.Balloon.TextHeight;
		});
	}

	drawActor(ctx) {
		let bw = this._stage.map.brickSize;
		let bh = bw / 2;

		if (!this._actor) {
			ctx.strokeStyle = 'rgba(255, 0, 0, 0.9)';
			ctx.strokeRect(this.x - bh, this.y - bh, bw, bw);
			return;
		}
		let sx = this.x - this._actor.hW;
		let sy = this.y - this._actor.hH;

		if (this._actor.type == Actor.Type.Subaerial) {
			this._actor.checkInverse();
		}
		this._actor.draw(ctx);
		if (this._actor.belongings) {
			ctx.strokeStyle = 'rgba(255, 80, 80, 0.9)';
			ctx.strokeRect(sx, sy, this._actor.width, this._actor.height);
		}
		if (this.op == 'Spw') {
			ctx.fillStyle = '#ffa500';
		} else {
			ctx.fillStyle = '#ff6347';
		}
		ctx.beginPath();
		ctx.arc(this.x, this.y, bh / 2, 0, Math.PI2);
		ctx.fill();

		if (this.hasFocus) {
			// ctx.strokeStyle = 'white';
			// ctx.beginPath();
			// ctx.arc(sx + bh, sy + bh, bh, 0, Math.PI2);
			// ctx.stroke();
			ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
			ctx.fillRect(sx, sy, this._actor.width, this._actor.height);
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
			ctx.strokeRect(sx, sy, this._actor.width, this._actor.height);
		}
	}

	draw(ctx) {
		if (this.type == Scenario.Type.Actor) {
			this.drawActor(ctx);
			return;
		}
		let stage = this._stage;
		let width = stage.map.brickSize;
		let height = stage._product.height;
		let sx = this.v;

		ctx.strokeStyle = 'rgba(0, 0, 0, .5)';
		ctx.strokeRect(sx, 0, width, height);
		ctx.strokeStyle = 'rgba(255, 255, 255, .5)';
		ctx.strokeRect(sx + 1, 1, width - 2, height - 2);
		if (this.type == Scenario.Type.Mode) {
			// Mode
			ctx.fillStyle = 'rgba(255, 100, 100, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
			// this.drawMode(ctx, this);
			return;
		}
		if (this.type == Scenario.Type.Effect) {
			// Effect
			ctx.fillStyle = 'rgba(100, 255, 100, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
			return;
		}
		if (this.type == Scenario.Type.Audio) {
			// Audio
			ctx.fillStyle = 'rgba(100, 100, 255, .5)';
			ctx.fillRect(sx + 2, 2, width - 4, height - 4);
		}
	}

	getActor(number) {
		return this._stage._product._mediaset.getActor(number,
			{ x: this.x, y: this.y, _stage: this._stage });
	}

	assignActor() {
		let actor = this.getActor(this.number);

		if (this.belongings && this.belongings != '0') {
			actor.belongings = this.getActor(this.belongings);
			// console.log('belongings:');
			// console.log(this._actor.belongings);
		}
		return actor;
	}

	init() {
		this.x = this.v;
		this.y = this.h;
		this.type = Scenario.TypeMap[this.op];
		// console.log('Scenario#init');
		// console.log(this);
		if (this.type == Scenario.Type.Actor) {
			this._actor = this.assignActor();
			this.name = this._actor.className;
		}
		if (this.op == 'Apl') {
			let audio = this._stage._product._mediaset.getAudio(this.number);

			if (audio) {
				this.name = audio.name;
			}
		}
		return this;
	}

	static create(rec, stage = null) {
		return Object.assign(new Scenario(), rec, { _stage: stage }).init();
	}
}
Scenario.Balloon = {
	TextHeight: 16,
	Margin: 4,
	Padding: 4,
}
Scenario.Type = {
	Actor: 0, Mode: 1, Effect: 2, Audio: 3,
}
Scenario.TypeList = [
	['Spw', 'Rev'],
	['Ent', 'Ckp', 'Bos', 'Stp', 'Nxt'],
	['Efi', 'Efo'],
	['Apa', 'Are', 'Afa', 'Apl'],
]
Scenario.TypeMap = {}
Scenario.TypeList.forEach((a, i) => a.forEach(v => Scenario.TypeMap[v] = i));

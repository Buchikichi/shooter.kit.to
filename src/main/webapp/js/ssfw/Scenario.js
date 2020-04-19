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

		if (this.type == Scenario.Type.Actor) {
			let width = this._stage.map.brickSize * 2; // FIXME:
			let hW = width / 2;

			return x - hW <= pos.x && pos.x <= x + hW && y - hW <= pos.y && pos.y <= y + hW;
		}
		let height = this._stage.map._mainVisual.image.height;

		return x - bh <= pos.x && pos.x <= x + bh && 0 <= pos.y && pos.y <= height;
	}

	getActor() {
		if (!this._actor) {
			this._actor = this._stage._product._mediaset.getActor(this.number);
			if (this._actor) {
				if (this.number != this._actor.seq) {
					console.log('Scenario#getActor:'
						+ this.number + '>' + this._actor.seq + ':' + this._actor.className);
					console.log(this._actor);
					this.number = this._actor.seq;
					this.name = this._actor.className;
				}
			}
		}
		return this._actor;
	}

	getText() {
		let prefix = this.op;

		if (this.type == Scenario.Type.Actor) {
			prefix += ':' + this.number;
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
		ctx.fillText(text, x + 4, y + 4);
	}

	drawActor(ctx) {
		let actor = this.getActor();
		let bw = this._stage.map.brickSize;
		let bh = bw / 2;
		let sx = this.v * bw;
		let sy = this.h * bw;

		if (actor) {
			actor.x = sx + actor.hW;
			actor.y = sy + actor.hH;
			actor.draw(ctx);
			if (actor.width) {
				ctx.strokeStyle = 'rgba(80, 255, 80, 0.6)';
				ctx.strokeRect(sx, sy, actor.width, actor.height);
			}
		}
		if (this.op == 'Spw') {
			ctx.fillStyle = 'orange';
		} else {
			ctx.fillStyle = 'tomato';
		}
		ctx.beginPath();
		ctx.arc(sx + bh, sy + bh, bh, 0, Math.PI2);
		ctx.fill();

		if (this.hasFocus) {
			// ctx.strokeStyle = 'white';
			// ctx.beginPath();
			// ctx.arc(sx + bh, sy + bh, bh, 0, Math.PI2);
			// ctx.stroke();
			ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
			ctx.fillRect(sx, sy, actor.width, actor.height);
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
		let sx = this.v * width;

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

	init() {
		this.type = Scenario.TypeMap[this.op];
		// console.log('Scenario#init');
		// console.log(this);
		if (this.type == Scenario.Type.Actor) {
			let actor = this.getActor();

			if (actor) {
				this.name = actor.className;
			}
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

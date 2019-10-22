class StageEditor extends Stage {
	constructor() {
		super();
	}

	setProgress(x) {
		if (this.fg.speed == 0) {
			return;
		}
		let progress = x * this.map.brickSize / this.fg.speed;

		this.map.setProgress(progress);
		this.progress = progress;
	}

	draw(ctx) {
//console.log('draw:' + this.eventList.length);
		ctx.save();
		this.eventList.forEach(rec => {
			let bw = this.map.brickSize;
			let bh = bw / 2;
			let sx = rec.v * bw + bh;
			let sy = rec.h * bw + bh;

			ctx.fillStyle = 'orange';
			ctx.beginPath();
			ctx.arc(sx, sy, bh, 0, Math.PI2);
			ctx.fill();
		});
		ctx.restore();
	}

	init() {
		super.init();
		this.eventList = this.scenarioList.concat();
		return this;
	}

	static create(rec) {
		return Object.assign(new StageEditor(), rec).init();
	}
}

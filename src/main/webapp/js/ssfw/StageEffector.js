class StageEffector {
	constructor() {
		this.reset();
	}

	reset() {
		this.op = null;
		this.progress = 0;
		this.isVisible = true;
		this.isBrickVisible = true;
	}

	start(op) {
		if (op == 'Efi') {
			if (this.isVisible) {
				return;
			}
		}
		if (op == 'Efo') {
			if (!this.isVisible) {
				return;
			}
			this.isBrickVisible = false;
		}
		this.op = op;
		this.progress = 0;
	}

	move() {
		if (!this.op) {
			return;
		}
		if (StageEffector.MaxProgress <= this.progress) {
			this.isVisible = this.op == 'Efi';
			this.isBrickVisible = this.isVisible;
			return;
		}
		this.progress++;
	}

	effect(ctx) {
		if (!this.op) {
			return;
		}
		if (this.op == 'Efi') {
			let a = this.progress / StageEffector.MaxProgress;

			ctx.filter = 'brightness(' + a + ')';
		} else if (this.op == 'Efo') {
			let a = (StageEffector.MaxProgress - this.progress) / StageEffector.MaxProgress;

			ctx.filter = 'brightness(' + a + ')';
		}

//		  ctx.globalAlpha = a;
		// ctx.filter = 'brightness(' + a + ')';
	}

	draw(ctx) {
		let a = this.progress / StageEffector.MaxProgress;

		ctx.save();
		ctx.fillStyle = 'rgba(255, 0, 255, ' + a + ')';
		ctx.beginPath();
		ctx.arc(this.x, 100, this.progress, 0, Math.PI2);
		ctx.fill();
		ctx.restore();
		this.progress++;
		if (StageEffector.MaxProgress < this.progress) this.progress = 0;
	}
}
StageEffector.MaxProgress = 200;

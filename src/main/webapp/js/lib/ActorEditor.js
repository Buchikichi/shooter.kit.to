class ActorEditor extends Actor {
	constructor() {
        super();
    }

    draw(ctx) {
        let left = -this.hW;
        let top = -this.hH;

        ctx.save();
        // ctx.fillStyle = 'orange';
		// ctx.beginPath();
		// ctx.arc(0, 0, 64, 0, Math.PI2);
        // ctx.fill();
        this.actorVisualList.forEach(v => v.draw(ctx));
        ctx.strokeStyle = 'rgba(255, 255, 255, .8)';
        ctx.strokeRect(left, top, this.width, this.height);
        ctx.restore();
    }

	static create(obj) {
		if ('string' == typeof obj) {
			return new ActorEntity().select(obj).then(actor => {
				return ActorEditor.create(actor);
			});
		}
		return Object.assign(new ActorEditor(), obj).init();
	}
}

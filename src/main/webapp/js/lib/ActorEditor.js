class ActorEditor extends Actor {
	constructor() {
        super();
    }

    draw(ctx) {
        ctx.save();
        super.draw(ctx);

        ctx.translate(this.x, this.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, .6)';
        if (this.regionType == 0) {
            ctx.beginPath();
            ctx.arc(0, 0, this.regionSize / 2, 0, Math.PI2, false);
            ctx.stroke();
        } else {
            let half = this.regionSize / 2;
            let left = -half;
            let top = -half;

            ctx.strokeRect(left, top, this.regionSize, this.regionSize);
        }
        ctx.restore();
    }

    save() {
        // console.log('ActorEditor#save');
        // console.log(this);
        this.actorAudioList.forEach(a => a.actor = { id: this.id });
        this.actorVisualList.forEach(v => v.actor = { id: this.id });
        return new ActorEntity().save(this);
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

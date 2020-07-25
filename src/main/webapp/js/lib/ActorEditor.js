class ActorEditor extends Actor {
	constructor() {
		super();
	}

	draw(ctx) {
		super.draw(ctx);
		ctx.save();
		ctx.translate(this.x, this.y);
		this.region.draw(ctx);
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

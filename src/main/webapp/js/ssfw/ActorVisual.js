class ActorVisual extends Matter {
	constructor() {
		super();
	}

	draw(ctx) {
		let left = -this.hW;
		let top = -this.hH;
		let sw = this.width;
		let sh = this.height;
if (this.img)
		ctx.drawImage(this.img, 0, 0, sw, sh, left, top, sw, sh);
	}

	init() {
		// console.log('ActorVisual#init:' + this.visualSeq);
		this.setRect(this._actor.width, this._actor.height);
		this.visual = Mediaset.Instance.getVisualBySeq(this);
if (this.visual)
		this.img = VisualManager.Instance.dic[this.visual.id];
		// console.log(this.img);
		return this;
	}

	static create(rec, actor) {
		return Object.assign(new ActorVisual(), rec, { _actor: actor }).init();
	}
}

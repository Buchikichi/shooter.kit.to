class ActorVisual extends Matter {
	constructor() {
		super();
		this.dir = 0;
	}

	move(target) {
		let dx = target.x - this._actor.x;
		let dy = target.y - this._actor.y;

		if (this.dirType == Actor.DirType.Chase) {
			let step = Math.PI / 180 * this.dirSpeed;

			this.dir = Math.close(this.dir, Math.atan2(dy, dx), step);
		} else if (this.dirType == Actor.DirType.Fit) {
			this.dir = this._actor.dir;
		}
	}

	draw(ctx) {
		let left = -this.hW;
		let top = -this.hH;
		let sw = this.width;
		let sh = this.height;
		ctx.save();
		if (this._actor.isInverse && this.dirType == Actor.DirType.Manual) {
			ctx.rotate(Math.PI);
		}
		ctx.rotate(this.dir);
		if (this.img)
			ctx.drawImage(this.img, 0, 0, sw, sh, left, top, sw, sh);
		ctx.restore();
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

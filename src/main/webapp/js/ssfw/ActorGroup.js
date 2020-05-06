class ActorGroup extends Actor {
	constructor() {
		super();
		this.list = [];
		this.ready = false;
		this.score = 0;
	}

	add(actor) {
		this.x = actor.x;
		this.y = actor.y;
		this.list.push(actor);
		this.ready = this.list.length == this.count;
		this.score += actor.score;
		this.text = this.score;
		// console.log('ActorGroup#add ready:' + this.ready);
	}

	isDestroyed() {
		let survivors = this.list.filter(a => 0 < a.hitPoint).length;

		if (survivors == 0 && this.explosion == 0) {
			this.explosion = ActorGroup.MAX_EXPLOSION;
			// console.log('ActorGroup#isDestroyed');
			return true;
		}
		return false;
	}

	move(target) {
		// console.log('ActorGroup#move ready:' + this.ready + '/isGone:' + this.isGone);
		super.move(target);
		// console.log('ActorGroup#move x:' + this.x + '/y:' + this.y + '/isGone:' + this.isGone);
		if (!this.ready) {
			return;
		}
		this.list.forEach(a => {
			if (!a.isGone && this.explosion == 0) {
				this.x = a.x;
				this.y = a.y;
				this.z = a.z;
			}
		});
		if (!this.isGone && this.isDestroyed()) {
			let capsules = [SpeedupCapsule, MissileCapsule];
			let ix = Math.floor(Math.random() * capsules.length);
			let clazz = capsules[ix];
			let capsule = new clazz();

			capsule.x = this.x;
			capsule.y = this.y;
			this.spawn.push(capsule);
		}
	}

	drawExplosion(ctx) {
		ctx.fillStyle = 'rgba(240, 240, 255, .8)';
		ctx.fillText(this.text, 0, 0);
	}

	// draw(ctx) {
	// 	super.draw(ctx);
	// 	ctx.save();
	// 	ctx.translate(this.x, this.y);
	// 	ctx.strokeStyle = 'blue';
	// 	ctx.beginPath();
	// 	ctx.arc(0, 0, 8, 0, Math.PI2);
	// 	ctx.stroke();
	// 	ctx.restore();
	// }

	init() {
		this.y = 0;
		return this;
	}

	static create(rec) {
		return Object.assign(new ActorGroup(), rec).init();
	}
}
ActorGroup.MAX_EXPLOSION = 150;

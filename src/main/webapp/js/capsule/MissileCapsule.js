class MissileCapsule extends Capsule {
	constructor(target) {
		super(target);
		this.anim = new Animator('capsule.missileCapsule', Animator.TYPE.Y);
	}

	fate(target) {
		target.powerUpMissile();
		this.eject();
	}
}

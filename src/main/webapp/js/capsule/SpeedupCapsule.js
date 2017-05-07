class SpeedupCapsule extends Capsule {
	constructor(target) {
		super(target);
		this.anim = new Animator('capsule.speedupCapsule', Animator.TYPE.Y);
	}

	fate(target) {
		target.speedup();
		this.eject();
	}
}

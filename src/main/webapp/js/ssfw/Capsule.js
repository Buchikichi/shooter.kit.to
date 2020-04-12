class Capsule extends Actor {
	constructor() {
		super(0, 0, -1);
	}

	move(target) {
		super.move(target);
		if (this.region.isHit(target.region)) {
			this.fate(target);
		}
	}

	fate(target) {
		if (this.className == 'SpeedupCapsule') {
			target.speedup();
		}
		if (this.className == 'MissileCapsule') {
			target.powerUpMissile();
		}
		this.eject();
	}

	static create(rec, params = {}) {
		return Object.assign(new Capsule(), rec, params).init();
	}
}

/**
 * Missile.
 */
class Missile extends Actor {
	constructor(x, y, opt) {
		super(x, y);
		this.dir = opt.dir;
		this.radius = 2;
		this.speed = 3;
		this.gravity = opt.gravity;
		this.activityAreaType = Actor.ActivityAreaType.EJECT;
		this.recalculation();
		this.shuttle = 3;
		this.fillStyle = 'rgba(200, 200, 255, 0.6)';
	}

	reactX(y) {
		super.reactX(y);
		this.shuttle--;
		if (this.shuttle < 0) {
			this.fate();
		}
	}

	fate() {
		this.eject();
	}
}

/**
 * Bullet.
 */
class Bullet extends Actor {
	constructor(x, y) {
		super(x, y);
		this.region = new Region(this, 2);
		this.radius = 3;
		this.speed = 2;
		this.fillStyle = 'rgba(180, 200, 255, 0.7)';
		this.recalculation();
	}

	move(target) {
		super.move(target);
		if (this.walled) {
			this.eject();
			return;
		}
	}
}

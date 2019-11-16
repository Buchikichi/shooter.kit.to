/**
 * Bullet.
 */
class Bullet extends Actor {
	constructor(x, y) {
		super(x, y);
		this.region = new Region(this, 2);
		this.radius = 3;
		this.speed = 2;
		this.anim = new Animator('bullet');
		this.activityAreaType = Actor.ActivityAreaType.EJECT;
		this.collidingWallType = Actor.CollidingWallType.EJECT;
		this.recalculation();
	}

	move(target) {
		super.move(target);
		this.radian += Bullet.RAD_STEP;
	}
}
Bullet.RAD_STEP = Math.PI / 180;

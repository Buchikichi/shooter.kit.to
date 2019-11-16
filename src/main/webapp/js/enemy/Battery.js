/**
 * Battery.
 */
class Battery extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.speed = 0;
		this.hitPoint = 1;
		this.score = 10;
		this.anim = [
			new Animator('enemy.battery'),
			new Animator('enemy.batteryBase', Animator.TYPE.NONE)
		];
		this.routine = [
			new Movement().add(Gizmo.TYPE.AIM, Gizmo.DEST.ROTATE).add(Gizmo.TYPE.FIXED, Gizmo.DEST.TO)
		];
		this.activityAreaType = Actor.ActivityAreaType.EJECT;
		this.checkInverse();
	}

	drawNormal(ctx) {
		if (this.isInverse) {
			if (this.radian < -Math.SQ) {
				this.radian = Math.PI;
			} else if (this.radian < 0) {
				this.radian = 0
			}
		} else {
			if (Math.SQ < this.radian) {
				this.radian = Math.PI;
			} else if (0 < this.radian) {
				this.radian = 0
			}
		}
		super.drawNormal(ctx);
	}
}

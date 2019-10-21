/**
 * Shot.
 */
class Shot extends Actor {
	constructor(x, y) {
		super(x, y);
		this.dir = 0;
		this.radius = 2;
		this.speed = 6;
		this.size = 2;
		this.activityAreaType = Actor.ActivityAreaType.EJECT;
		this.fillStyle = 'rgba(255, 255, 0, 0.7)';

		let pan = Product.Instance.calcPan(this);
		AudioMixer.INSTANCE.play('sfx-fire', .4, false, pan);
	}

	fate() {
		this.eject();
	}

	move(target) {
		super.move(target);
		if (this.walled) {
			if (this.walled == Landform.BRICK_TYPE.BRITTLE) {
				Field.Instance.landform.smashWall(this);
			}
			this.fate();
			return;
		}
	}
}

/**
 * Bouncer.
 */
class Bouncer extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.dir = this.x <= 0 ? 0 : Math.PI;
		this.speed = 2;
		this.gravity = .1;
		this.reaction = .95;
		this.hitPoint = 3;
		this.score = 500;
		this.shuttle = 2;
		this.anim = new Animator('enemy.bouncer', Animator.TYPE.NONE);
	}

	move(target) {
		if (this.shuttle && (this.x < 0 || Product.Instance.width + Landform.BRICK_WIDTH < this.x)) {
			this.dir = Math.trim(this.dir + Math.PI);
			this.x = this.svX;
			this.shuttle--;
		}
		if (this.walled) {
			this.x = this.svX;
			this.y = this.svY;
		}
		return super.move(target);
	}
}

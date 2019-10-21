/**
 * DragonBody.
 */
class DragonBody extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.region = new Region(this, 16);
		this.hasBounds = false;
		this.hitPoint = Number.MAX_SAFE_INTEGER;
		this.score = 0;
		this.anim = new Animator('enemy.dragonBody');
	}

	get triggered() {
		return false;
	}
}

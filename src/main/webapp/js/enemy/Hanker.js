/**
 * Hanker.
 */
class Hanker_bk extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.speed = .7;
		this.hitPoint = 2;
		this.score = 50;
		this.anim = new Animator('enemy.hanker');
		this.routine = [
			new Movement().add(Gizmo.TYPE.AIM, Gizmo.DEST.ROTATE).add(Gizmo.TYPE.CHASE, Gizmo.DEST.TO)
		];
	}
}

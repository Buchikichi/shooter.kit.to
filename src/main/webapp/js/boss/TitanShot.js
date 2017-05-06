/**
 * TitanShot.
 */
class TitanShot extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.dir = Math.PI;
		this.radian = this.dir;
		this.speed = 7;
		this.hitPoint = Number.MAX_SAFE_INTEGER;
		this.anim = new Animator(this, 'boss/titan/titan.shot.png');
	}
}

// 'Titan.js' に置きたいが TitanShot,TitanBullet,TitanBall を参照するため、定義の後に置く必要がある
Titan.ROUTINE = new MotionRoutine([
	new Motion(Motion.TYPE.ONLY_ONE, '111_7.amc', 2, Math.PI / 4).offsetX(0).offsetY(0),
	new Motion(Motion.TYPE.NORMAL, '79_96.amc', 1, -Math.PI * .4)
		.shot(TitanShot, ['lradius', 'lwrist', 'lhand', 'lthumb', 'lfingers'], 200), // shot
	new Motion(Motion.TYPE.REWIND, '133_01.amc', 2, Math.PI)
		.shot(TitanBullet, ['thorax', 'upperneck'], {min:200, max:550}), // crawl
	new Motion(Motion.TYPE.NORMAL, '79_91.amc', 1, -Math.PI * .4)
		.shot(TitanBall, ['rhumerus', 'rradius', 'rwrist', 'rhand'], {min:175, max:200}), // throw
	new Motion(Motion.TYPE.NORMAL, '86_01b.amc', 2, Math.PI)
		.shot(Bullet, ['lfingers', 'rfingers'], {min:0, max:1000}), // jump
]);
MotionManager.INSTANCE.reserve('asf');

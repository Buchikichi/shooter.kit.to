/**
 * Titan.
 */
class Titan extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.scale = 7;
		this.hitPoint = Number.MAX_SAFE_INTEGER;
		this.motionRoutine = Titan.ROUTINE;
		this.motionRoutine.reset();
		//
		let asf = Object.assign({}, VisualManager.Instance.dic['asf.json']);

		this.skeleton = new Skeleton(asf);
		this.setupBone();
	}

	setupBone() {
		let boneMap = {};

		Object.keys(this.skeleton.map).forEach(key => {
			if (key == 'root') {
				return;
			}
			let titanBone = new TitanBone(key, 0, 0);

			if (key == Titan.CORE) {
				titanBone.hitPoint = Titan.HIT_POINT;
			}
			boneMap[key] = titanBone;
		});
		this.boneMap = boneMap;
		this.appears = false;
	}

	eject() {
		super.eject();
		Object.keys(this.boneMap).forEach(key => {
			let bone = this.boneMap[key];

			bone.hitPoint = 0;
			bone.explosion = Actor.MAX_EXPLOSION * 2;
		});
	}

	move(target) {
		let list = [];
		let skeleton = this.skeleton;
		let filling = this.motionRoutine.next(skeleton);

		super.move(target);
		if (!this.appears) {
			Object.keys(this.boneMap).forEach(key => {
				list.push(this.boneMap[key]);
			});
			this.appears = true;
			return list.reverse();
		}
		let map = this.skeleton.map;
		let isDestroy = false;

		if (filling) {
			filling.id.forEach(id => {
				let titanBone = this.boneMap[id];
				let shot = new filling.type(titanBone.x, titanBone.y);

				shot.dir = titanBone.radian;
				list.push(shot);
			});
		}
		Object.keys(this.boneMap).forEach(key => {
			let bone = map[key];
			let x = bone.cx * this.scale + this.x;
			let y = bone.cy * this.scale + this.y;
			let titanBone = this.boneMap[key];

			titanBone.x = x;
			titanBone.y = y;
			titanBone.z = bone.cz;
			titanBone.radian = bone.radian;
			if (titanBone.hitPoint == 0) {
				isDestroy = true;
			}
		});
		if (isDestroy) {
			this.eject();
		}
		return list;
	}

	drawInfo(ctx) {
		let motion = this.motionRoutine.current;
		let lowerback = this.boneMap[Titan.CORE];

		ctx.save();
		ctx.translate(this.x, this.y);
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
		ctx.strokeText('ix:' + motion.ix, 0, 0);
		ctx.strokeText('hp:' + lowerback.hitPoint, 0, 10);
		ctx.restore();
	}

	drawNormal(ctx) {
		ctx.save();
		ctx.translate(this.x, this.y);
		if (this.skeleton) {
			ctx.scale(this.scale, this.scale);
			// skeleton
			ctx.strokeStyle = 'rgba(203, 152, 135, 0.2)';
			this.skeleton.draw(ctx);
		}
		ctx.restore();
//		this.drawInfo(ctx);
	}

	isHit(target) {
		return false;
	}
}
Titan.HIT_POINT = 292;
Titan.CORE = 'lowerback';

//-----------------------------------------------------------------------------
/**
 * TitanBone.
 */
class TitanBone extends Enemy {
	constructor(id, x, y) {
		super(x, y);
		this.id = id;
		this.hasBounds = false;
		this.hitPoint = Number.MAX_SAFE_INTEGER;
		this.filling = null;
		this.anim = new Animator('boss.titan.' + id);
	}

	get triggered() {
		return false;
	}

	drawNormal(ctx) {
		super.drawNormal(ctx);
//		ctx.save();
//		ctx.translate(this.x, this.y);
//		ctx.beginPath();
//		ctx.strokeStyle = 'rgba(200, 200, 200, 0.6)';
//		ctx.strokeText(this.id, 0, 0);
//		ctx.restore();
	}
}

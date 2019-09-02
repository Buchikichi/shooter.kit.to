/**
 * Skeleton.
 * @author Hidetaka Sasai
 */
class Skeleton {
	constructor(data) {
		this.data = data;
		this.map = {};
		this.offsetX = 0;
		this.offsetY = 0;
		this.rotationH = Math.PI / 4;
		this.rotationV = Math.PI / 8;
		this.rotationMatrix = new Matrix(Matrix.NO_EFFECT);
		this.init();
	}

	init() {
		let root = Object.assign(new Bone(), this.data.root);

		this.data.root = root;
		this.prepare(root);
		this.calcRotationMatrix();
	}

	prepare(node) {
		let children = [];

		node.prepare();
		node.joint.forEach(child => {
			child.parent = node;
			children.push(Object.assign(new Bone(), child));
		});
		node.joint = children;
		node.joint.forEach(child => {
			this.prepare(child);
		});
		node.skeleton = this;
		this.map[node.name] = node;
	}

	calcRotationMatrix() {
		let mh = Matrix.rotateY(this.rotationH);

		this.rotationMatrix = Matrix.rotateX(this.rotationV).multiply(mh);
	}

	rotateH(diff) {
		this.rotationH += (Math.PI / 720) * diff;
		this.rotationH = Math.trim(this.rotationH);
		this.calcRotationMatrix();
	}

	rotateV(diff) {
		this.rotationV += (Math.PI / 720) * diff;
		this.rotationV = Math.trim(this.rotationV);
		this.calcRotationMatrix();
	}

	shift(motionList, direction) {
		motionList.forEach(motion => {
			let r = motion.r;
			let bone = this.map[motion.name];
			let rx = Matrix.rotateX(r.x);
			let ry = Matrix.rotateY(r.y);
			let rz = Matrix.rotateZ(r.z);

			bone.motionMatrix = rz.multiply(ry).multiply(rx);
			if (motion.p) {
				// root
				let p = motion.p;
				let prev = bone.pt;
				let x = this.offsetX + prev.x + p.x * direction;
				let y = this.offsetY + prev.y + p.y * direction;
				let z = prev.z + p.z * direction;

				bone.translateMatrix = new Matrix([[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]]);
			}
		});
	}

	calculate(isSimple) {
		this.data.root.calculate(isSimple);
	}

	draw(ctx) {
		this.data.root.draw(ctx);
	}
}

/**
 * Bone.
 * @author Hidetaka Sasai
 */
class Bone {
	constructor() {
		this.pt = {x:0, y:0, z:0};
	}

	prepare() {
		let t = this.translate;
		let mx = Matrix.rotateX(this.axis.x);
		let my = Matrix.rotateY(this.axis.y);
		let mz = Matrix.rotateZ(this.axis.z);
		let am = mz.multiply(my).multiply(mx);

		this.translateMatrix = new Matrix([[1,0,0,t.x],[0,1,0,t.y],[0,0,1,t.z],[0,0,0,1]]);
		if (this.parent) {
			let parent = this.parent;
			let rx = Matrix.rotateX(-parent.axis.x);
			let ry = Matrix.rotateY(-parent.axis.y);
			let rz = Matrix.rotateZ(-parent.axis.z);
			let pm = rx.multiply(ry).multiply(rz);

			this.axisMatrix = pm.multiply(am);
		} else {
			this.axisMatrix = am;
		}
		this.motionMatrix = new Matrix(Matrix.NO_EFFECT);
	}

	getAccum() {
		if (this.parent) {
			let mat = this.axisMatrix.multiply(this.motionMatrix).multiply(this.translateMatrix);

			return this.parent.getAccum().multiply(mat);
		}
		return this.translateMatrix.multiply(this.motionMatrix);
	}

	calculate(isSimple) {
		this.pt = this.getAccum().affine(0, 0, 0);
		if (isSimple) {
			return;
		}
		this.joint.forEach(function(child) {
			child.calculate(false);
		});
	}

	drawLine(ctx) {
		let prevPt = this.parent.pt;
		let nextPt = this.pt;
		let mx = this.skeleton.rotationMatrix;

		prevPt = mx.affine(prevPt.x, prevPt.y, prevPt.z);
		nextPt = mx.affine(nextPt.x, nextPt.y, nextPt.z);
		let nextX = nextPt.x;
		let nextY = -nextPt.y;
		let prevX = prevPt.x;
		let prevY = -prevPt.y;
		let dx = nextX - prevX;
		let dy = nextY - prevY;

		this.cx = prevX + dx / 2;
		this.cy = prevY + dy / 2;
		this.cz = nextPt.z;
		this.radian = Math.atan2(dy, dx);
		ctx.beginPath();
		ctx.moveTo(prevX, prevY);
		ctx.lineTo(nextX, nextY);
		ctx.stroke();
	}

	draw(ctx) {
		this.calculate();
		if (this.parent) {
			this.drawLine(ctx);
		}
		this.joint.forEach(function(child) {
			child.draw(ctx);
		});
	}
}

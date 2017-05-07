/**
 * Skeleton.
 * @author Hidetaka Sasai
 */
function Skeleton(data) {
	this.data = data;
	this.map = {};
	this.offsetX = 0;
	this.offsetY = 0;
	this.rotationH = Math.PI / 4;
	this.rotationV = Math.PI / 8;
	this.rotationMatrix = new Matrix(Matrix.NO_EFFECT);
	this.init();
}

Skeleton.prototype.init = function() {
	let root = Object.assign(new Bone(), this.data.root);

	this.data.root = root;
	this.prepare(root);
	this.calcRotationMatrix();
};

Skeleton.prototype.prepare = function(node) {
	let skeleton = this;
	let children = [];

	node.prepare();
	node.joint.forEach(function(child) {
		child.parent = node;
		children.push(Object.assign(new Bone(), child));
	});
	node.joint = children;
	node.joint.forEach(function(child) {
		skeleton.prepare(child);
	});
	node.skeleton = this;
	this.map[node.name] = node;
};

Skeleton.prototype.calcRotationMatrix = function() {
	let mh = Matrix.rotateY(this.rotationH);

	this.rotationMatrix = Matrix.rotateX(this.rotationV).multiply(mh);
};

Skeleton.prototype.rotateH = function(diff) {
	this.rotationH += (Math.PI / 720) * diff;
	this.rotationH = Math.trim(this.rotationH);
	this.calcRotationMatrix();
};

Skeleton.prototype.rotateV = function(diff) {
	this.rotationV += (Math.PI / 720) * diff;
	this.rotationV = Math.trim(this.rotationV);
	this.calcRotationMatrix();
};

Skeleton.prototype.shift = function(motionList, direction) {
	let skeleton = this;

	motionList.forEach(function(motion) {
		let r = motion.r;
		let bone = skeleton.map[motion.name];
		let rx = Matrix.rotateX(r.x);
		let ry = Matrix.rotateY(r.y);
		let rz = Matrix.rotateZ(r.z);

		bone.motionMatrix = rz.multiply(ry).multiply(rx);
		if (motion.p) {
			// root
			let p = motion.p;
			let prev = bone.pt;
			let x = skeleton.offsetX + prev.x + p.x * direction;
			let y = skeleton.offsetY + prev.y + p.y * direction;
			let z = prev.z + p.z * direction;

			bone.translateMatrix = new Matrix([[1,0,0,x],[0,1,0,y],[0,0,1,z],[0,0,0,1]]);
		}
	});
};

Skeleton.prototype.calculate = function(isSimple) {
	this.data.root.calculate(isSimple);
};

Skeleton.prototype.draw = function(ctx) {
	this.data.root.draw(ctx);
};


/**
 * Bone.
 * @author Hidetaka Sasai
 */
function Bone() {
	this.pt = {x:0, y:0, z:0};
}

Bone.prototype.prepare = function() {
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
};

Bone.prototype.getAccum = function() {
	if (this.parent) {
		let mat = this.axisMatrix.multiply(this.motionMatrix).multiply(this.translateMatrix);

		return this.parent.getAccum().multiply(mat);
	}
	return this.translateMatrix.multiply(this.motionMatrix);
};

Bone.prototype.calculate = function(isSimple) {
	this.pt = this.getAccum().affine(0, 0, 0);
	if (isSimple) {
		return;
	}
	this.joint.forEach(function(child) {
		child.calculate(false);
	});
};

Bone.prototype.drawLine = function(ctx) {
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
};

Bone.prototype.draw = function(ctx) {
	this.calculate();
	if (this.parent) {
		this.drawLine(ctx);
	}
	this.joint.forEach(function(child) {
		child.draw(ctx);
	});
};

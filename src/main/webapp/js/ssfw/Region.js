class Region {
	constructor(matter, size = Region.DefaultSize, type = Region.Type.CIRCLE) {
		this._matter = matter;
		if (!this._matter.regionSize) {
			this._matter.regionSize = size;
		}
		if (!this._matter.regionType) {
			this._matter.regionType = type;
		}
	}

	isHit(target) {
		let type = this._matter.regionType;
		let size = this._matter.regionSize;

		if (type == Region.Type.CIRCLE) {
			if (target._matter.regionType == Region.Type.CIRCLE) {
				let wX = this._matter.x - target._matter.x;
				let wY = this._matter.y - target._matter.y;
				let distance = Math.sqrt(wX * wX + wY * wY);

				return distance < size + target._matter.regionSize;
			}
		}
console.log('*Not implement*');
	}

	draw(ctx) {
		let type = this._matter.regionType;
		let size = this._matter.regionSize;

		ctx.save();
		ctx.strokeStyle = 'rgba(80, 255, 80, 0.6)';
		if (type == Region.Type.CIRCLE) {
			ctx.beginPath();
			ctx.arc(0, 0, size, 0, Math.PI2, false);
			ctx.stroke();
		} else if (type == Region.Type.RECTANGLE) {
			let width = size / 2;

			ctx.strokeRect(-size, -size, width, width);
		}
		ctx.restore();
	}
}
Region.DefaultSize = 4;
Region.Type = {
	CIRCLE: 0,
	RECTANGLE: 1,
};

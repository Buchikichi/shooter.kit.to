/**
 * FieldMapEditor.
 */
class FieldMapEditor extends FieldMap {
	constructor() {
		super();
	}

	get mapImage() {
		let canvas = document.createElement('canvas');
		let ctx = canvas.getContext('2d');

		canvas.width = this.bricks.width;
		canvas.height = this.bricks.height;
		ctx.putImageData(this.bricks, 0, 0);
		return canvas.toDataURL('image/png');
	}

	get formData() {
		let formData = new FormData();

		formData.append('id', this.map.id);
		formData.append('name', this.map.name);
		formData.append('map', this.mapImage);
		formData.append('brickSize', this.map.brickSize);
		formData.append('mainSeq', this.map.mainSeq);
		this.mapVisualList.forEach(mapVisual => {
			let prefix = 'mapVisualList[' + mapVisual.seq + '].';

			formData.append(prefix + 'seq', mapVisual.seq);
			formData.append(prefix + 'visualType', mapVisual.visualType);
			formData.append(prefix + 'visualSeq', mapVisual.visualSeq);
			formData.append(prefix + 'x', mapVisual.x);
			formData.append(prefix + 'y', mapVisual.y);
			formData.append(prefix + 'radian', mapVisual.radian);
			formData.append(prefix + 'speed', mapVisual.speed);
			formData.append(prefix + 'blink', mapVisual.blink);
		});
		return formData;
	}

	save() {
		return new MapEntity().saveMap(this.formData);
	}
}

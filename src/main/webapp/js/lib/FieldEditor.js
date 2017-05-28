class FieldEditor extends Field {
	constructor(width, height) {
		super(width, height);
	}

	setupLandform() {
		this.landform = new LandformEditor(this.view.canvas);
	}
}

class FieldEditor extends Field {
	constructor(view, stage) {
		super(view);
		this.stage = stage;
	}

	setupLandform(view) {
		this.landform = new LandformEditor(view.canvas);
	}
}

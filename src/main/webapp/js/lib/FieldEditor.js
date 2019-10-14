class FieldEditor extends Field {
	constructor(view, stage) {
		super(view);
		Product.Instance.stage = stage;
	}

	setupLandform(view) {
		this.landform = new LandformEditor(view.canvas);
	}
}

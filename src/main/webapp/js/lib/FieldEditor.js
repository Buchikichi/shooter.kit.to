class FieldEditor extends Field {
	constructor(view) {
		super(view);
		this.setRect(view.width, view.height);
		this.setupLandform(view);
		Field.Instance = this;
	}

	setupLandform(view) {
		this.landform = new LandformEditor(view.canvas);
	}
}

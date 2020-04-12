class ImageSelector extends SelectorBase {
	constructor() {
		super(new VisualEntity(), 'imageSelector');
	}

	makeParams() {
		let type = this.listbox.value;

		return { criteria: { mediaset: { id: this.mediasetId }, visualType: type } };
	}
}

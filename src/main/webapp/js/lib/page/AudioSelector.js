class AudioSelector extends SelectorBase {
	constructor() {
		super(new AudioEntity(), 'audioSelector');
	}

	makeParams() {
		let type = this.listbox.value;

		return { criteria: { mediaset: { id: this.mediasetId }, audioType: type } };
	}

	onItemClick(name, dataSeq) {
		super.onItemClick(name, dataSeq);
		this.targetButton.textContent = name;
	}
}

class ActorSelector extends SelectorBase {
	constructor() {
		super(new ActorEntity(), 'actorSelector');
	}

	makeParams() {
		let type = this.listbox.value;
		let productId = document.getElementById('productId').value;

		return { criteria: { product: { id: productId }, mediaset: { id: this.mediasetId }, type: type } };
	}

	onItemClick(name, dataSeq) {
		super.onItemClick(name, dataSeq);
		this.targetButton.textContent = name;
	}
}

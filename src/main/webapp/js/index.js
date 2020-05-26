document.addEventListener('DOMContentLoaded', () => new ProductIndexMain());

class ProductIndexMain {
	constructor() {
		this.listProducts();
		new ProductCreationPanel(this);
	}

	listProducts() {
		let listView = document.getElementById('listView');

		$.mobile.loading('show', { theme: 'b', text: 'Loading...', textVisible: true });
		listView.textContent = 'Loading...';
		new ProductEntity().list().then(doc => {
			listView.textContent = null;
			doc.querySelectorAll('li').forEach(li => listView.appendChild(li));
			$(listView).listview('refresh');
			$.mobile.loading('hide');
		});
	}
}

class ProductCreationPanel extends PanelBase {
	constructor(parent) {
		super('newProduct');
		this.parent = parent;
	}

	setupEvents() {
		super.setupEvents();
		let form = this.panel.querySelector('form');

		form.addEventListener('submit', e => {
			this.createProduct();
			e.preventDefault();
			return false;
		});
	}

	onOpen() {
		let select = this.panel.querySelector('[name=mediaset\\.id]');

		select.textContent = null;
		new MediasetEntity().list().then(doc => {
			doc.querySelectorAll('option').forEach(option => select.appendChild(option));
			$(select).selectmenu('refresh', false);
		});
	}

	createProduct() {
		let entityData = this.createEntityData();

		// console.log('ProductCreationPanel#createProduct');
		// console.log(entityData);
		new ProductEntity().save(entityData).then(res => {
			if (res.ok) {
				this.parent.listProducts();
				this.close();
			}
		});
	}
}

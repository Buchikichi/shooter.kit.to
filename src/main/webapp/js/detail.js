document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		this.productStageView = document.getElementById('productStageView');
		this.stagePanel = document.getElementById('stagePanel');
		this.stageView = document.getElementById('stageView');
		this.product = new ProductEntity();
		this.customer = new Customer();
		this.stage = new StageEntity();
		this.setupButton();
		this.setupPanel();
		this.checkCustomer();
		$(this.productStageView).sortable();
	}

	setupButton() {
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> {
			this.saveProduct();
		});
	}

	setupPanel() {
		let plusButton = document.querySelector('[data-role="header"] a');

		plusButton.addEventListener('click', ()=> {
			let keyword = '';

			this.stageView.textContent = 'Loading...';
			this.stage.list(keyword).then(data => {
				this.stageView.textContent = null;
				data.forEach(rec => {
					let li = this.createRow(rec);
					let anchor = li.querySelector('a');

					this.stageView.append(li);
					anchor.addEventListener('click', ()=> {
						this.addStage(rec);
						$(this.stagePanel).panel('close');
					});
				});
				$(this.stageView).listview('refresh');
			});
		});
	}

	addStage(rec) {
		let id = rec.id;
		let elements = this.productStageView.querySelectorAll('li');
		let exists = false;

		elements.forEach(li => {
			let dataId = li.getAttribute('data-id');

			if (dataId == rec.id) {
				exists = true;
			}
		});
		if (exists) {
			return;
		}
		let li = this.createRow(rec);

		li.setAttribute('data-icon', 'false');
		this.productStageView.append(li);
		$(this.productStageView).listview('refresh');
	}

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', '/img/icon.listview.png');
		name.textContent = rec.name;
		description.textContent = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		li.setAttribute('data-id', rec.id);
		li.append(anchor);
		return li;
	}

	checkCustomer() {
		this.customer.check().then(data => {
			if (data.ok) {
				$('#footerNav a:eq(1)').removeClass('ui-state-disabled');
				$('#footerNav a:eq(2)').removeClass('ui-state-disabled');
				$('#footerNav').navbar('refresh');
			}
		});
	}

	saveProduct() {
		let form = document.getElementById('productForm');
		let formData = new FormData(form);

		this.product.save(formData).then(data => {
console.log(data);
		});
//*/
	}
}

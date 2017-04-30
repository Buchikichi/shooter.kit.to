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
					let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
					let li = listviewRow.li;
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
		let stageId = rec.id;
		let elements = this.productStageView.querySelectorAll('li');
		let exists = false;

		elements.forEach(li => {
			let dataId = li.getAttribute('data-id');

			if (dataId == stageId) {
				exists = true;
			}
		});
		if (exists) {
			return;
		}
		rec.href = '#editStagePanel';
		let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
		let li = listviewRow.li;

		li.setAttribute('data-id', stageId);
		this.productStageView.append(li);
		$(this.productStageView).listview('refresh');
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

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		this.product.save(formData).then(data => {
			let messagePopup = document.getElementById('messagePopup');
			let content = messagePopup.querySelector('p');

console.log(data);
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Saved.';
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}
}

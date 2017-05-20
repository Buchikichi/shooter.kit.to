document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new ProductActorPage();
	new TitleBg();
});

class AppMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		this.productStageView = document.getElementById('productStageView');
		this.product = new ProductEntity();
		this.customer = new Customer();
		this.stagePanel = new StagePanel();
		this.editStagePanel = new EditStagePanel(this);
		this.productActorPanel = new ProductActorPanel(this);
		this.setupButton();
		this.checkCustomer();
		$(this.productStageView).sortable();
	}

	setupButton() {
		let plusButton = document.querySelector('[data-role="header"] a');

		plusButton.addEventListener('click', ()=> {
			this.stagePanel.open(this.addStage);
		});
		//
		let stageButtonList = this.productStageView.querySelectorAll('a');

		stageButtonList.forEach(anchor => {
			anchor.addEventListener('click', ()=> {
				let rec = this.getRec(anchor);

				this.editStagePanel.open(rec);
			});
		});
		//
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> {
			this.saveProduct();
		});
		$(saveButton).addClass('ui-state-disabled');
	}

	getRec(anchor) {
		let id = anchor.getAttribute('data-id');
		let stageId = anchor.getAttribute('data-stage');
		let roll = anchor.getAttribute('data-roll');

		return {
			id: id,
			stageId: stageId,
			roll: roll,
		};
	}

	addStage(rec) {
		let stageId = rec.id;
		let elements = this.productStageView.querySelectorAll('li');
		let exists = false;

		elements.forEach(li => {
			let anchor = li.querySelector('a');
			let dataId = anchor.getAttribute('data-stage');

			if (dataId == stageId) {
				exists = true;
			}
		});
		if (exists) {
			return false;
		}
		rec.href = '#editStagePanel';
		let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
		let li = listviewRow.li;
		let anchor = listviewRow.anchor;

		anchor.setAttribute('data-stage', stageId);
		anchor.setAttribute('data-roll', 0);
		this.productStageView.appendChild(li);
		$(this.productStageView).listview('refresh');
		return true;
	}

	getLi(stageId) {
		let stageList = this.productStageView.querySelectorAll('li');
		let target = null;

		stageList.forEach(li => {
			let anchor = li.querySelector('a');
			let dataId = anchor.getAttribute('data-stage');

			if (dataId == stageId) {
				target = li;
			}
		});
		return target;
	}

	updateStage(rec) {
		let li = this.getLi(rec.stageId);

		if (li == null) {
			return;
		}
		let anchor = li.querySelector('a');

		anchor.setAttribute('data-roll', rec.roll);
//		Object.keys(rec).forEach(key => {
//console.log('update ' + key + ':' + rec[key]);
//		});
	}

	removeStage(stageId) {
		let li = this.getLi(stageId);

		this.productStageView.removeChild(li);
	}

	checkCustomer() {
		let saveButton = document.getElementById('saveButton');

		this.customer.check().then(data => {
			if (data.ok) {
				$(saveButton).removeClass('ui-state-disabled');
				$('#footerNav a:eq(1)').removeClass('ui-state-disabled');
			}
		});
	}

	listStages() {
		let list = [];
		let stageList = this.productStageView.querySelectorAll('li');

		stageList.forEach((li, ix) => {
			let anchor = li.querySelector('a');
			let rec = this.getRec(anchor);

			rec.seq = ix;
			list.push(rec);
		});
		return list;
	}

	saveProduct() {
		let form = document.getElementById('productForm');
		let formData = new FormData(form);
		let stageList = this.listStages();

		stageList.forEach(rec => {
			let prefix = 'detail[' + rec.seq + '].';

//console.log(rec);
			formData.append(prefix + 'stageId', rec.stageId);
			formData.append(prefix + 'seq', rec.seq);
			formData.append(prefix + 'roll', rec.roll);
		});
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

class ProductActorPage {
	constructor() {
		this.page = document.getElementById('productActor');
		$(this.page).find('.actorList').sortable({
			connectWith: '.actorList',
			items: 'li:not(.divider)',
		});
	}
}

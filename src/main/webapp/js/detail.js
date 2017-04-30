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
		this.product = new ProductEntity();
		this.customer = new Customer();
		this.stagePanel = new StagePanel();
		this.editStagePanel = new EditStagePanel(this);
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

		stageButtonList.forEach(stageButton => {
			stageButton.addEventListener('click', ()=> {
				let stageId = stageButton.getAttribute('data-id');
				let roll = stageButton.getAttribute('data-roll');
				let rec = {
					stageId: stageId,
					roll: roll,
				};

				this.editStagePanel.open(rec);
			});
		});
		//
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> {
			this.saveProduct();
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
			return false;
		}
		rec.href = '#editStagePanel';
		let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
		let li = listviewRow.li;
		let anchor = listviewRow.anchor;

		anchor.setAttribute('data-id', stageId);
		anchor.setAttribute('data-roll', 0);
		this.productStageView.append(li);
		$(this.productStageView).listview('refresh');
		return true;
	}

	getLi(stageId) {
		let stageList = this.productStageView.querySelectorAll('li');
		let target = null;

		stageList.forEach(li => {
			let anchor = li.querySelector('a');
			let dataId = anchor.getAttribute('data-id');

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
		this.customer.check().then(data => {
			if (data.ok) {
				$('#footerNav a:eq(1)').removeClass('ui-state-disabled');
				$('#footerNav a:eq(2)').removeClass('ui-state-disabled');
				$('#footerNav').navbar('refresh');
			}
		});
	}

	listStages() {
		let list = [];
		let stageList = this.productStageView.querySelectorAll('li');

		stageList.forEach((li, ix) => {
			let anchor = li.querySelector('a');
			let stageId = anchor.getAttribute('data-id');
			let roll = anchor.getAttribute('data-roll');
			let rec = {
				stageId: stageId,
				seq: ix,
				roll: roll,
			};

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

class StagePanel {
	constructor() {
		this.panel = document.getElementById('stagePanel');
		this.stageView = document.getElementById('stageView');
		this.stage = new StageEntity();
	}

	open(callBack) {
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
					if (!callBack(rec)) {
console.log('Already exists.');
						return;
					}
					$(this.stagePanel).panel('close');
				});
			});
			$(this.stageView).listview('refresh');
		});
	}
}

class EditStagePanel {
	constructor(appMain) {
		this.appMain = appMain;
		this.panel = document.getElementById('editStagePanel');
		this.roll = this.panel.querySelector('select');
		this.rec = {};
		this.setupEvent();
	}

	setupEvent() {
		this.roll.addEventListener('change', ()=> {
			this.rec.roll = this.roll.value;
		});
		//
		let deleteButton = this.panel.querySelector('.ui-icon-delete');

		deleteButton.addEventListener('click', ()=> {
			this.appMain.removeStage(this.rec.stageId);
			$(this.panel).panel('close');
		});
		//
		$(this.panel).on('panelclose', ()=> {
			this.appMain.updateStage(this.rec);
		});
	}

	open(rec) {
		this.rec = rec;
		$(this.roll).val([rec.roll]).selectmenu('refresh');
	}
}

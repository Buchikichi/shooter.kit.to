document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		let productId = document.querySelector('input[name=id]').value;
		let loading = document.getElementById('loading');

		ProductEditor.create(productId).then(product => {
//			this.setupActors(product);
			this.product = product;
			return Mediaset.Instance.checkLoading((loaded, max) => loading.innerHTML = loaded + '/' + max);
		}).then(()=> {
			loading.parentNode.removeChild(loading);
//			this.start();
		});

		this.productStageView = document.getElementById('productStageView');
		this.customer = new Customer();
		this.stagePanel = new StagePanel();
		this.productActorPage = new ProductActorPage();
		this.setupEvents();
		this.checkCustomer();
		$(this.productStageView).sortable({handle: '.sortable'});
	}

	setupEvents() {
		let plusButton = document.querySelector('a[href="#stagePanel"]');
		let editMediasetButton = document.getElementById('editMediasetButton');

		plusButton.addEventListener('click', ()=> {
			this.stagePanel.open(this.addStage);
		});
		editMediasetButton.addEventListener('click', ()=> {
			let mediasetSelect = document.getElementById('mediaset.id');

			window.open('/mediaset/edit/' + mediasetSelect.value);
		});
		//
		this.productStageView.querySelectorAll('li').forEach(li => {
			let anchor = li.querySelector('a:first-child');
			let delButton = li.querySelector('a:last-child');
			let id = anchor.getAttribute('data-id');

			anchor.addEventListener('click', ()=> window.open('/stage/edit/' + id));
			delButton.addEventListener('click', ()=> {
//				this.productStageView.removeChild(li);
			});
		});
		//
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> this.saveProduct());
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
		let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
		let li = listviewRow.li;
		let anchor = listviewRow.anchor;
		let delButton = document.createElement('a');

		console.log(rec);
		anchor.setAttribute('data-stage', stageId);
		anchor.setAttribute('data-roll', 0);
		anchor.addEventListener('click', ()=> window.open('/stage/edit/' + stageId));
		delButton.addEventListener('click', ()=> this.productStageView.removeChild(li));
		li.appendChild(delButton);
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

		this.productStageView.querySelectorAll('li').forEach((li, ix) => {
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
		let actorList = this.productActorPage.listActor();

		this.product.updateStageSeq(stageList);
// 		stageList.forEach(rec => {
// 			let prefix = 'stageList[' + rec.seq + '].';

// console.log(rec);
// 		});
		// actorList.forEach((rec, ix) => {
		// 	if (!rec) {
		// 		return;
		// 	}
		// 	let prefix = 'actorList[' + ix + '].';

		// 	formData.append(prefix + 'actor.id', rec.actorId);
		// 	formData.append(prefix + 'seq', ix);
		// 	formData.append(prefix + 'type', rec.productType);
		// 	formData.append(prefix + 'className', rec.className);
		// });
		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		this.product.save().then(data => {
			let messagePopup = document.getElementById('messagePopup');
			let content = messagePopup.querySelector('p');

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

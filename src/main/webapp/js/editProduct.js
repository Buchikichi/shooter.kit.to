document.addEventListener('DOMContentLoaded', () => new ProductEditorMain());

class ProductEditorMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		let productId = document.querySelector('input[name=id]').value;
		let loading = document.getElementById('loading');
		let callback = (loaded, max) => loading.innerHTML = loaded + '/' + max;

		ProductEditor.create(productId, callback).then(product => {
//			this.setupActors(product);
			this.product = product;
			loading.parentNode.removeChild(loading);
//			this.start();
		});

		this.stagePanel = new StagePanel();
		this.setupEvents();
		this.setupListView();
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
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> this.saveProduct());
	}

	setupListView() {
		this.productStageView = document.getElementById('productStageView');
		this.productStageView.querySelectorAll('li').forEach(li => {
			let anchor = li.querySelector('a:first-child');
			let delButton = li.querySelector('a:last-child');
			let id = anchor.getAttribute('data-id');

			anchor.addEventListener('click', ()=> window.open('/stage/edit/' + id));
			delButton.addEventListener('click', ()=> {
//				this.productStageView.removeChild(li);
			});
		});
		$(this.productStageView).sortable({handle: '.sortable'});
		this.actorList = document.querySelectorAll('.actorList');
		this.actorList.forEach(ul => {
			$(ul).sortable({
				connectWith: '.actorList',
				items: 'li:not(.divider)',
				stop: (event, ui)=> {
					// ソート終了時
console.log(event);
console.log(ui);
					this.actorList.forEach(e => {
						this.refreshCounter(e);
					});
				}
			});
		});
	}

	refreshCounter(ul) {
		let liList = ul.querySelectorAll('li:not(.divider)');
		let span = ul.previousElementSibling.querySelector('.ui-li-count');

		span.textContent = liList.length;
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
		let stageList = this.listStages();

		this.product.updateStageSeq(stageList);
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

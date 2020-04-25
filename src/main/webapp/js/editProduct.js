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
			this.product = product;
			loading.parentNode.removeChild(loading);
//			this.start();
			this.infoPanel = new ProductInfoPanel(product);
			this.stagePanel = new StagePanel(product);
		});
		this.setupEvents();
	}

	setupEvents() {
		let plusButton = document.querySelector('a[href="#stagePanel"]');
		let saveButton = document.getElementById('saveButton');

		this.productStageView = document.getElementById('productStageView');
		this.productStageView.querySelectorAll('li').forEach(li => this.setupStageItemEvent(li));
		$(this.productStageView).sortable();
		plusButton.addEventListener('click', () => this.stagePanel.open(this.addStage));
		saveButton.addEventListener('click', () => this.saveProduct());
	}

	setupStageItemEvent(li) {
		let delButton = li.querySelector('a:last-child');

		delButton.addEventListener('click', () => {
			console.log('delButton!!');
			// this.productStageView.removeChild(li);
		});
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

class ProductInfoPanel extends PanelBase {
	constructor(product) {
		super('infoPanel', product);
	}
}

class StagePanel extends PanelBase {
	constructor(product) {
		super('stagePanel');
		this.product = product;
	}

	open(callBack) {
		let ul = this.panel.querySelector('ul');
		let mediasetId = document.getElementById('mediaset\.id').value;
		let params = { criteria: { mediasetId: mediasetId } };

		ul.textContent = 'Loading...';
		new MapEntity().list(params).then(doc => {
			ul.textContent = null;
			doc.querySelectorAll('li').forEach(li => {
				let anchor = li.querySelector('a');
				let mapId = li.getAttribute('data-id');

				anchor.removeAttribute('href');
				anchor.addEventListener('click', () => this.addStage(mapId, callBack));
				ul.appendChild(li);
			});
			$(ul).listview('refresh');
		});
	}

	addStage(mapId, callBack) {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');
		let productId = document.querySelector('input[name=id]');
		let productStageView = document.getElementById('productStageView');
		let seq = productStageView.querySelectorAll('li').length;
		let stage = { product: { id: productId.value }, map: { id: mapId }, seq: seq };

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		new StageEntity().save(stage).then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				if (!callBack(data.result)) {
					console.log('Already exists!');
					return;
				}
			} else {
				content.textContent = 'Save failed.';
				$(messagePopup).popup('open', {});
			}
			$(this.panel).panel('close');
		});
	}
}

class StagePanel_bk {
	constructor() {
		this.panel = document.getElementById('stagePanel');
		this.map = new MapEntity();
		this.stage = new StageEntity();
	}

	open(callBack) {
		let ul = this.panel.querySelector('ul');
		let keyword = '';

		ul.textContent = 'Loading...';
		this.map.list(keyword).then(data => {
			ul.textContent = null;
			data.result.forEach(rec => {
				let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
				let li = listviewRow.li;
				let anchor = li.querySelector('a');

				ul.appendChild(li);
				anchor.addEventListener('click', ()=> this.addStage(rec, callBack));
			});
			$(ul).listview('refresh');
		});
	}

	addStage(rec, callBack) {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');
		let productId = document.querySelector('input[name=id]');
		let productStageView = document.getElementById('productStageView');
		let seq = productStageView.querySelectorAll('li').length;
		let stage = { product: { id: productId.value }, map: { id: rec.id }, seq: seq };

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

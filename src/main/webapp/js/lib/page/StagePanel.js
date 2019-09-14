class StagePanel {
	constructor() {
		this.panel = document.getElementById('stagePanel');
		this.stageView = this.panel.querySelector('ul');
		this.map = new MapEntity();
	}

	open(callBack) {
		let ul = this.stageView;
		let keyword = '';

		ul.textContent = 'Loading...';
		this.map.list(keyword).then(data => {
			ul.textContent = null;
			data.result.forEach(rec => {
				let listviewRow = new ListviewRow(rec, '/img/icon.listview.png');
				let li = listviewRow.li;
				let anchor = li.querySelector('a');

				ul.appendChild(li);
				anchor.addEventListener('click', ()=> {
					if (!callBack(rec)) {
console.log('Already exists!');
						return;
					}
					$(this.stagePanel).panel('close');
				});
			});
			$(ul).listview('refresh');
		});
	}
}

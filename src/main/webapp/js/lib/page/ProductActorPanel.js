class ProductActorPanel {
	constructor(appMain) {
		this.appMain = appMain;
		this.panel = document.getElementById('ActorPanel');
		this.listView = this.panel.querySelector('ul');
		this.entity = new ActorEntity();
		this.setupEvent();
	}

	setupEvent() {
		let actorButton = document.querySelector('[href="#ActorPanel"]');

		actorButton.addEventListener('click', ()=> {
			this.listActor();
		});
	}

	listActor(keyword = '') {
		let ul = this.listView;

		ul.textContent = 'Loading...';
		this.entity.list().then(list => {
			ul.textContent = null;
			list.forEach(rec => {
				let listviewRow = new ListviewRow(rec, '/image/src/' + rec.imageid);
				let li = listviewRow.li;
				let anchor = li.querySelector('a');

				ul.appendChild(li);
				anchor.addEventListener('click', ()=> {
console.log('click');
//					if (!callBack(rec)) {
//console.log('Already exists.');
//						return;
//					}
				});
			});
			$(ul).listview('refresh');
		});
	}
}

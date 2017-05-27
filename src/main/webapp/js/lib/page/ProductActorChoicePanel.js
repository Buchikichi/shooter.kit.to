class ProductActorChoicePanel {
	constructor(page) {
		this.page = page;
		this.panel = document.getElementById('ProductActorChoicePanel');
		this.actorType = this.panel.querySelector('select');
		this.listView = this.panel.querySelector('ul');
		this.entity = new ActorEntity();
		this.setupEvent();
	}

	setupEvent() {
		let actorButton = document.querySelector('[href="#ProductActorChoicePanel"]');

		actorButton.addEventListener('click', ()=> {
			this.listActor();
		});
		this.setupActorType();
	}

	setupActorType() {
		Object.keys(Actor.Type).forEach(key => {
			let value = Actor.Type[key];

			if (value == 0 || key == 'Formation') {
				return;
			}
			// (filter)
			let option = document.createElement('option');
			option.setAttribute('value', value);
			if (key == 'Enemy') {
				option.setAttribute('selected', 'selected');
			}
			option.textContent = key;
			this.actorType.appendChild(option);
		});
		this.actorType.addEventListener('change', ()=> {
			this.listActor();
		});
	}

	createParameter() {
		let input = this.panel.querySelector('input');
		let formData = new FormData();

		formData.append('keyword', input.value);
		formData.append('type', this.actorType.value);
		return formData;
	}

	listActor() {
		let formData = this.createParameter();
		let ul = this.listView;

		ul.textContent = 'Loading...';
		this.entity.list(formData).then(list => {
			ul.textContent = null;
			list.forEach(rec => {
				let listviewRow = new ListviewRow(rec, '/image/src/' + rec.imageid);
				let li = listviewRow.li;
				let anchor = li.querySelector('a');

				ul.appendChild(li);
				anchor.addEventListener('click', ()=> {
					this.page.appendActor(rec);
				});
			});
			$(ul).listview('refresh');
		});
	}
}

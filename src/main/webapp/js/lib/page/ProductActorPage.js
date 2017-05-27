class ProductActorPage {
	constructor() {
		this.page = document.getElementById('productActor');
		this.actorList = $(this.page).find('.actorList');
		this.actorList.sortable({
			connectWith: '.actorList',
			items: 'li:not(.divider)',
			stop: (event, ui)=> {
				// ソート終了時
				this.actorList.each((ix, ul) => {
					this.refreshCounter(ul);
				});
			}
		});
		this.productActorChoicePanel = new ProductActorChoicePanel(this);
		this.productActorPanel = new ProductActorPanel(this);
		this.setupActorType();
		this.setupEvent();
	}

	setupActorType() {
		this.typeMap = {};
		Array.prototype.forEach.call(this.actorList, ul => {
			let type = this.getActorType(ul.id);

			if (0 < type) {
				this.typeMap[type] = ul;
			}
		});
	}

	getActorType(id) {
		let type = 0;

		Object.keys(Actor.Type).forEach(key => {
			if (id.startsWith(key)) {
				type = Actor.Type[key];
			}
		});
		return type;
	}

	setupEvent() {
		this.actorList.each((ix, ul) => {
			let liList = ul.querySelectorAll('li:not(.divider)');

			Array.prototype.forEach.call(liList, li => {
				let anchor = li.querySelector('a');
				let deleteButton = li.querySelector('a.deleteButton');

				anchor.addEventListener('click', ()=> {
					this.productActorPanel.open(li);
				});
				deleteButton.addEventListener('click', ()=> {
					li.parentNode.removeChild(li);
					this.refreshCounter(ul);
				});
			});
			this.refreshCounter(ul);
		});
	}

	refreshCounter(ul) {
		let liList = ul.querySelectorAll('li:not(.divider)');
		let span = ul.querySelector('.ui-li-count');

		span.textContent = liList.length;
	}

	createClassName(rec) {
		let str = rec.name;
		let name = '';
		let upper = true;

		for (let ix = 0; ix < str.length; ix++) {
			let ch = str.charAt(ix);

			if (!ch.match(/[0-9A-Za-z]/)) {
				upper = true;
				continue;
			}
			if (upper) {
				ch = ch.toUpperCase();
				upper = false;
			}
			name += ch;
		}
		return name;
	}

	appendActor(rec) {
		let ul = this.typeMap[rec.type];
//		//<li><img src="/img/icon.listview.png"/><span>CCC</span><p>ccc</p></li>
		let row = new ListviewRow(rec, '/image/src/' + rec.imageid);
		let li = row.li;
		let anchor = row.anchor;
		let deleteButton = document.createElement('a');

		li.appendChild(deleteButton);
		deleteButton.addEventListener('click', ()=> {
			li.parentNode.removeChild(li);
			this.refreshCounter(ul);
		});
		anchor.addEventListener('click', ()=> {
			this.productActorPanel.open(li);
		});
		anchor.setAttribute('href', '#ProductActorPanel');
		anchor.setAttribute('data-actor', rec.id);
		anchor.setAttribute('data-class', this.createClassName(rec));
		ul.appendChild(li);
		$(ul).listview('refresh');
		this.refreshCounter(ul);
	}

	/**
	 * 保存するための一覧.
	 */
	listActor() {
		let list = [];

		Object.keys(Actor.Type).forEach(key => {
			let type = Actor.Type[key];
			let ul = this.typeMap[type];
			if (!ul) {
				// 'Formation'
				return;
			}
			let liList = ul.querySelectorAll('li:not(.divider)');
			let ix = type;

			Array.prototype.forEach.call(liList, li => {
				let anchor = li.querySelector('a');
				let actorId = anchor.getAttribute('data-actor');
				let className = anchor.getAttribute('data-class');

				list[ix] = {
					actorId: actorId,
					productType: type,
					className: className,
				};
				ix++;
			});
		});
		return list;
	}
}

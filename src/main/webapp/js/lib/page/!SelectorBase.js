class SelectorBase {
	constructor(entity, name, listbox = 'type') {
		this.entity = entity;
		this.name = name;
		this.selectorPopup = document.getElementById(name);
		this.listbox = this.selectorPopup.querySelector('[name=' + listbox + ']');
		this.mediasetId = document.getElementById('mediasetId').value;
		this.targetButton = null;
		this.setupEvents();
	}

	setupEvents() {
		document.querySelectorAll('.' + this.name).forEach(button => {
			button.addEventListener('click', () => this.onButtonClick(button));
		});
		this.listbox.addEventListener('change', () => this.loadList());
	}

	loadList() {
		let listView = this.selectorPopup.querySelector('ul');

		listView.textContent = 'Loadling...';
		this.entity.list(this.makeParams()).then(doc => {
			listView.textContent = null;
			doc.querySelectorAll('li').forEach(li => {
				let name = li.querySelector('span').textContent;
				let dataSeq = li.getAttribute('data-seq');

				li.querySelector('a').addEventListener('click', () => this.onItemClick(name, dataSeq));
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}

	onButtonClick(button) {
		let type = button.getAttribute('data-type');

		if (type) {
			this.listbox.value = type;
			$(this.listbox).selectmenu('refresh');
		}
		this.loadList();
		this.targetButton = button;
		this.targetButton.removeAttribute('data-seq');
		$(this.selectorPopup).popup('open', {});
	}

	onItemClick(name, dataSeq) {
		this.targetButton.value = dataSeq;
		this.targetButton.setAttribute('data-type', this.listbox.value);
		this.targetButton.setAttribute('data-name', name);
		$(this.selectorPopup).popup('close');
	}
}

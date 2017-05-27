class ProductActorPanel {
	constructor(page) {
		this.page = page;
		this.panel = document.getElementById('ProductActorPanel');
		this.setupEvent();
	}

	setupEvent() {
		let okButton = this.panel.querySelector('button');

		okButton.addEventListener('click', ()=> {
			let className = this.panel.querySelector('[name="className"]');
			let anchor = this.li.querySelector('a');

			anchor.setAttribute('data-class', className.value)
		});
	}

	setupForm(li) {
		let name = li.querySelector('span').textContent;
		let clazz = li.querySelector('a').getAttribute('data-class');
		let actorName = this.panel.querySelector('[name="actorName"]');
		let className = this.panel.querySelector('[name="className"]');

		actorName.value = name;
		className.value = clazz;
		className.focus();
	}

	open(li) {
		this.li = li;
		this.setupForm(li);
	}
}

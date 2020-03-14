class ImageSelector {
	constructor(mediasetId) {
		this.selectorPopup = document.getElementById('imageSelector');
		this.mediasetId = mediasetId;
		this.entity = new VisualEntity();
		this.targetButton = null;
		this.setupEvents();
	}

	setupEvents() {
		let buttons = document.querySelectorAll('.imageSelector');
		let visualType = document.querySelector('[name=visualType]');

		buttons.forEach(button => {
			button.addEventListener('click', ()=> {
				this.targetButton = button;
				this.targetButton.removeAttribute('data-seq');
				$(this.selectorPopup).popup('open', {});
			});
		});
		visualType.addEventListener('change', ()=> this.loadList(visualType.value));
		this.loadList(visualType.value);
	}

	loadList(visualType) {
		let listView = this.selectorPopup.querySelector('ul');
		let data = { criteria: { mediaset: { id: this.mediasetId }, visualType: visualType } };

		listView.textContent = 'Loadling...';
		this.entity.list(data).then(doc => {
			listView.textContent = null;
			doc.querySelectorAll('li').forEach(li => {
				let name = li.querySelector('span').textContent;
				let visualSeq = li.getAttribute('data-seq');

				li.querySelector('a').addEventListener('click', () => {
					console.log('visualSeq:' + visualSeq);
					this.targetButton.textContent = name;
					this.targetButton.setAttribute('data-seq', visualSeq);
					this.targetButton.setAttribute('data-name', name);
					$(this.selectorPopup).popup('close');
				});
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}
}

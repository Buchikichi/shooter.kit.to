class AudioSelector {
	constructor() {
		this.selectorPopup = document.getElementById('audioSelector');
		this.mediasetId = document.getElementById('mediasetId').value;
		this.entity = new AudioEntity();
		this.targetButton = null;
		this.setupEvents();
	}

	setupEvents() {
		let buttons = document.querySelectorAll('.audioSelector');
		let audioType = document.querySelector('[name=audioType]');

		buttons.forEach(button => {
			button.addEventListener('click', ()=> {
				this.targetButton = button;
				$(this.selectorPopup).popup('open', {});
			});
		});
		audioType.addEventListener('change', ()=> this.loadList(audioType.value));
		this.loadList(audioType.value);
	}

	loadList(audioType) {
		let listView = this.selectorPopup.querySelector('ul');
		let data = { criteria: { mediaset: { id: this.mediasetId }, audioType: audioType } };

		listView.textContent = 'Loadling...';
		this.entity.list(data).then(doc => {
			listView.textContent = null;
			doc.querySelectorAll('li').forEach(li => {
				let name = li.querySelector('span').textContent;
				let audioSeq = li.getAttribute('data-seq');

				li.querySelector('a').addEventListener('click', () => {
					this.targetButton.textContent = name;
					this.targetButton.setAttribute('data-seq', audioSeq);
					$(this.selectorPopup).popup('close');
				});
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}
}

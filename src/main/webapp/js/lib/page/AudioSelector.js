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
		let ul = this.selectorPopup.querySelector('ul');
		let formData = new FormData();

		formData.append('mediasetId', this.mediasetId);
		formData.append('type', audioType);
		ul.textContent = 'Loadling...';
		this.entity.list(formData).then(data => {
			let list = Array.isArray(data) ? data : data.result;

			ul.textContent = null;
			list.forEach(rec => {
				let row = new ListviewRow(rec);
				let li = row.li;

				li.querySelector('a').addEventListener('click', ()=> {
					let audio = Mediaset.Instance.getAudioById(rec.id);
					console.log(audio);
					this.targetButton.textContent = rec.name;
					this.targetButton.setAttribute('data-seq', audio.audioSeq);
					$(this.selectorPopup).popup('close');
				});
				ul.appendChild(li);
			});
			$(ul).listview('refresh');
		});
	}
}

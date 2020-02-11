class AudioSelector {
	constructor() {
		this.audioSelector = document.getElementById('audioSelector');
		this.mediasetId = document.getElementById('mediasetId').value;
		this.entity = new AudioEntity();
		this.targetButton = null;
		this.setupEvents();
	}

	setupEvents() {
		let audioSelectors = document.querySelectorAll('.audioSelector');
		let audioType = document.querySelector('[name=audioType]');

		audioSelectors.forEach(button => {
			button.addEventListener('click', ()=> {
				this.targetButton = button;
				$(this.audioSelector).popup('open', {});
			});
		});
		audioType.addEventListener('change', ()=> this.loadAudio(audioType.value));
		this.loadAudio(audioType.value);
	}

	loadAudio(audioType) {
		let ul = this.audioSelector.querySelector('ul');
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
				let anchor = li.querySelector('a');

				anchor.addEventListener('click', ()=> {
					let audio = Mediaset.Instance.getAudioById(rec.id);
					console.log(audio);
					this.targetButton.textContent = rec.name;
					this.targetButton.setAttribute('data-type', audio.audioType);
					this.targetButton.setAttribute('data-seq', audio.audioSeq);
					$(this.audioSelector).popup('close');
                });
				ul.appendChild(li);
			});
			$(ul).listview('refresh');
		});
	}
}

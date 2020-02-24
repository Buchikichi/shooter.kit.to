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
		let ul = this.selectorPopup.querySelector('ul');
		let formData = new FormData();

		formData.append('mediasetId', this.mediasetId);
		formData.append('type', visualType);
		ul.textContent = 'Loadling...';
		this.entity.list(formData).then(data => {
			let list = Array.isArray(data) ? data : data.result;

			ul.textContent = null;
			list.forEach(rec => {
				let row = new ListviewRow(rec);
				let li = row.li;

				li.querySelector('a').addEventListener('click', ()=> {
					let visual = Mediaset.Instance.getVisual(rec.id);
					console.log(visual);
					this.targetButton.setAttribute('data-seq', visual.visualSeq);
					this.targetButton.setAttribute('data-name', rec.name);
					$(this.selectorPopup).popup('close');
				});
				ul.appendChild(li);
			});
			$(ul).listview('refresh');
		});
	}
}

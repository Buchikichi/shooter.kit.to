class ImageSelector {
	constructor() {
		this.imageSelector = document.getElementById('imageSelector');
		this.mediasetId = document.getElementById('mediasetId').value;
		this.entity = new VisualEntity();
		this.setupEvents();
	}

	setupEvents() {
		let addImageButton = document.querySelector('#addImageButton');
		let visualType = document.querySelector('[name=visualType]');

		addImageButton.addEventListener('click', ()=> {
			$(this.imageSelector).popup('open', {
			});
		});
		visualType.addEventListener('change', ()=> this.loadVisual(visualType.value));
		this.loadVisual(visualType.value);
	}

	loadVisual(visualType) {
		let ul = this.imageSelector.querySelector('ul');
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
				let anchor = li.querySelector('a');

				anchor.addEventListener('click', ()=> {
console.log(rec);
                });
				ul.appendChild(li);
			});
			$(ul).listview('refresh');
		});
	}
}

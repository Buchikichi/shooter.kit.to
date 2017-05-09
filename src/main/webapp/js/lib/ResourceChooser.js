/**
 * リソース選択(基底クラス).
 */
class ResourceChooser {
	constructor(id) {
		this.id = '#' + id;
		this.setupEvents();
	}

	setupEvents() {
		let anchorList = document.querySelectorAll('[href="' + this.id + '"]');

		anchorList.forEach(anchor => {
			let fieldset = $(anchor).parents('fieldset')[0];

			anchor.addEventListener('click', ()=> {
				let target = anchor.getAttribute('data-target');
				let filter = anchor.getAttribute('data-filter');
				let hidden = fieldset.querySelector('[name="' + target + '"]');

				this.list(hidden, filter);
			});
		});
	}

	createRow(rec, imgsrc = null) {
		return new ListviewRow(rec, imgsrc);
	}

	list(hidden, type) {
		let param = {keyword: '', type: type};

		this.listView = document.querySelector(this.id + ' > ul');
		this.listView.textContent = 'Loadling...';
		this.entity.list(param).then(data => {
			this.listView.textContent = null;
			data.forEach(rec => {
				let listviewRow = this.createRow(rec);

				this.listView.appendChild(listviewRow.li);
				listviewRow.anchor.addEventListener('click', ()=> {
					this.embedId(hidden, rec.id);
				});
			});
			$(this.listView).listview('refresh');
		});
	}

	embedId(hidden, id) {
		hidden.value = id;
		hidden.dispatchEvent(ResourceChooser.ValueChangedEvent);
		$(this.id).popup('close');
	}
}
ResourceChooser.ValueChangedEvent = new Event('valueChanged');

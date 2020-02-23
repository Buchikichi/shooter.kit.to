document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	constructor() {
		this.customer = new Customer();
		this.mapManager = new MapManager();
		this.actorManager = new ActorManager();
		this.imageManager = new ImageManager();
		this.audioManager = new AudioManager();
		this.imageChooser = new ImageChooser();
		this.audioChooser = new AudioChooser();
		this.setupPanel();
		this.checkCustomer();
		AppMain.Instance = this;
	}

	setupPanel() {
//console.log('AppMain::setupPanel');
		let plusButton = document.querySelector('[data-role="header"] a');
		let mapButton = document.getElementById('mapButton');
		let actorButton = document.getElementById('actorButton');
		let imageButton = document.getElementById('imageButton');
		let audioButton = document.getElementById('audioButton');

		mapButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#mapPanel');
			this.manager = this.mapManager;
			this.manager.list();
			this.hideFilter();
		});
		actorButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#actorPanel');
			this.manager = this.actorManager;
			this.manager.list();
			this.hideFilter();
			$('#actorType-select').show();
		});
		imageButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#imagePanel');
			this.manager = this.imageManager;
			this.manager.list();
			this.hideFilter();
			$('#visualType').show();
		});
		audioButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#audioPanel');
			this.manager = this.audioManager;
			this.manager.list();
			this.hideFilter();
			$('#audioType').show();
		});
		plusButton.addEventListener('click', ()=> {
			this.manager.resetPanel();
		});
		imageButton.click();
	}

	hideFilter() {
		$('#actorType-select').hide();
		$('#visualType').hide();
		$('#audioType').hide();
	}

	checkCustomer() {
		this.customer.check().then(data => {
//			if (data.ok) {
//				$('[href=#loginPanel]').hide();
//			}
		});
	}
}

class RepositoryManager {
	constructor() {
		this.mediasetId = document.querySelector('input[name="mediasetId"]').value;
		this.typeSelect = document.querySelector('#visualType [name="visualType"]');
		this.listView = document.getElementById('listView');
		this.valueChangedevent = new Event('valueChanged');
		$(this.listView).sortable({
			update: (event, ui)=> {
console.log('item:');
console.log(ui.item);
console.log('position:');
console.log(ui.position);
			},
		});
	}

	get panelId() {
		return this.panel.getAttribute('id');
	}

	setupPanel() {
		let access = this.form.querySelector('.access');

		if (access) {
			new AccessibleRange(access, this.panelId);
		}
		this.form.addEventListener('submit', event => {
			let formData = new FormData(this.form);

			event.preventDefault();
			$.mobile.loading('show', {text: 'Save...', textVisible: true});
console.log('RepositoryManager: saveResource');
			this.entity.saveResource(formData).then(data => {
				$.mobile.loading('hide');
				if (data.ok) {
					$(this.panel).panel('close');
					this.list();
				} else {
					$(this.panel).find('.message').text('Saving failed.');
				}
			});
			return false;
		});
	}

	select(rec) {
		$.mobile.loading('show', {textVisible: true});
		this.entity.select(rec.id).then(data => {
			this.resetPanel(data);
			$.mobile.loading('hide');
		});
		return {};
	}

	resetPanel(rec = {}) {
		let id = '#' + this.panelId;

		rec.mediasetId = this.mediasetId;
		$(id + ' :input').each((ix, input) => {
			let name = input.getAttribute('name');

			if (!name) {
				return;
			}
			let element = $(input);
			let val = '';

//console.log(name + ':' + element.attr('type'));
			if (element.is(':radio')) {
				element.val([rec[name]]).checkboxradio('refresh')
			} else if (element.is('select')) {
				element.val(rec[name]).selectmenu('refresh', false);
			} else if (element.is(':file')) {
				element.val(null);
			} else {
				element.val(rec[name]);
			}
			if (element.is(':hidden')) {
				input.dispatchEvent(this.valueChangedevent);
			}
		});
		let collapsible = $(this.panel).find('[data-role="collapsible"]');
		let len = Object.keys(rec).length;

		if (0 < len) {
			collapsible.collapsible('collapse')
		} else {
			collapsible.collapsible('expand')
		}
	}

	createParameter() {
		let formData = new FormData();
		let options = this.typeSelect.querySelectorAll('option');
		let type = options[this.typeSelect.selectedIndex].value;

		formData.append('mediasetId', this.mediasetId);
		formData.append('type', type);
		return formData;
	}

	list() {
		let param = this.createParameter();

		this.listView.textContent = 'Loadling...';
		this.entity.list(param).then(data => {
			let list = Array.isArray(data) ? data : data.result;

			this.listView.textContent = null;
			list.forEach(rec => {
				let li = this.createRow(rec);
				let anchor = li.querySelector('a:last-child');

				anchor.addEventListener('click', ()=> {
					this.resetPanel(this.select(rec));
				});
				this.listView.appendChild(li);
			});
			$(this.listView).listview('refresh');
		});
	}

	createRow(rec, imgsrc = null) {
		let listviewRow = new ListviewRow(rec, imgsrc);
		let anchor = document.createElement('a');

		anchor.setAttribute('href', '#' + this.panelId);
		listviewRow.li.appendChild(anchor);
		return listviewRow.li;
	}
}

/**
 * マップ.
 */
class MapManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('mapPanel');
		this.form = document.getElementById('stageForm');
		this.entity = new MapEntity();
		this.setupPanel();
	}

	setupPanel() {
		super.setupPanel();
		// edit map
		// let editButton = this.form.querySelector('.ui-icon-edit');

		// editButton.addEventListener('click', ()=> {
		// 	let hidden = this.form.querySelector('[name="id"]');
		// 	let id = hidden.value;

		// 	window.open('/map/edit/' + id);
		// });
	}

	getImgsrc(rec) {
		let imageId = null;

		['fg1', 'fg2', 'fg3', 'bg1', 'bg2', 'bg3'].forEach(field => {
			let id = rec[field];

			if (imageId == null && id != null && 0 < id.length) {
				imageId = id;
			}
		});
		if (imageId == null) {
			return '/img/icon.listview.png';
		}
		return '/visual/src/' + imageId;
	}

	createRow(rec) {
		let row = super.createRow(rec, this.getImgsrc(rec));

		row.querySelector('a:first-child').addEventListener('click', ()=> {
			window.open('/map/edit/' + rec.id);
		});
		return row;
	}
}

/**
 * アクター.
 */
class ActorManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('actorPanel');
		this.form = this.panel.querySelector('form');
		this.entity = new ActorEntity();
		this.setupPanel();
	}

	setupActorType() {
		let fieldset = document.getElementById('actorType-select');
		let select = fieldset.querySelector('select');
		let actorType = document.getElementById('actorType');

		Object.keys(Actor.Type).forEach(key => {
			let value = Actor.Type[key];

			if (value == 0 || key == 'Formation') {
				return;
			}
			// (filter)
			let option = document.createElement('option');
			option.setAttribute('value', value);
			if (key == 'Enemy') {
				option.setAttribute('selected', 'selected');
			}
			option.textContent = key;
			select.appendChild(option);
			// option
			let actorTypeOption = document.createElement('option');
			actorTypeOption.setAttribute('value', value);
			actorTypeOption.textContent = key;
			actorType.appendChild(actorTypeOption);
		});
		select.addEventListener('change', ()=> {
			this.list();
		});
		$(select).selectmenu('refresh', true);
	}

	setupPanel() {
		let imageButtons = this.form.querySelector('.imageButtons');

		this.setupActorType();
		super.setupPanel();
		['ImageId', 'ImageId', 'ImageId'].forEach(name => {
			let button = new ImageSelectionButton(name, VisualEntity.Type.ACT);

			imageButtons.appendChild(button.fieldset);
		});
	}

	createParameter() {
		let type = $('#actorType-select [name="actorType"]').val();
		let formData = new FormData();

		formData.append('keyword', '');
		formData.append('type', type);
		return formData;
	}

	createRow(rec) {
		return super.createRow(rec, '/visual/src/' + rec.imageid);
	}
}

/**
 * イメージ.
 */
class ImageManager extends RepositoryManager {
	constructor() {
		super();
		this.typeSelect = document.querySelector('#visualType [name="visualType"]');
		this.typeSelect.addEventListener('change', ()=> {
			this.list();
		});
		this.panel = document.getElementById('imagePanel');
		this.form = document.getElementById('imageForm');
		this.entity = new VisualEntity();
		this.setupPanel();
	}

	resetPanel(rec = {}) {
		super.resetPanel(rec);
		let img = document.getElementById('image.thumbnail');

		if (rec.id) {
			img.setAttribute('src', '/visual/src/' + rec.id);
		} else {
			img.removeAttribute('src');
		}
	}

	createRow(rec) {
		let imgsrc = rec.contentType.startsWith('image') ? '/visual/src/' + rec.id : '/img/icon.listview.png';

		return super.createRow(rec, imgsrc);
	}
}

/**
 * オーディオ.
 */
class AudioManager extends RepositoryManager {
	constructor() {
		super();
		this.typeSelect = document.querySelector('#audioType [name="audioType"]');
		this.typeSelect.addEventListener('change', ()=> {
			this.list();
		});
		this.panel = document.getElementById('audioPanel');
		this.form = document.getElementById('audioForm');
		this.entity = new AudioEntity();
		this.setupPanel();
	}

	resetPanel(rec = {}) {
		let webmAnchor = document.getElementById('webmAnchor');
		let audioAnchor = document.getElementById('audioAnchor');

		super.resetPanel(rec);
		if (rec.webmlen) {
			$(webmAnchor).show();
			webmAnchor.setAttribute('href', '/audio/webm/' + rec.id);
		} else {
			$(webmAnchor).hide();
		}
		if (rec.audiolen) {
			$(audioAnchor).show();
			audioAnchor.setAttribute('href', '/audio/audio/' + rec.id);
		} else {
			$(audioAnchor).hide();
		}
	}
}

/**
 * イメージ選択ダイアログ.
 */
class ImageChooser extends ResourceChooser {
	constructor() {
		super('imageChooser');
		this.entity = new VisualEntity();
	}

	createRow(rec) {
		return super.createRow(rec, '/visual/src/' + rec.id);
	}
}

/**
 * オーディオ選択ダイアログ.
 */
class AudioChooser extends ResourceChooser {
	constructor() {
		super('audioChooser');
		this.entity = new AudioEntity();
	}

	createRow(rec) {
		let listviewRow = super.createRow(rec);
		let anchor = listviewRow.anchor;
//		let img = listviewRow.img;
//
//		anchor.removeChild(img);
		return listviewRow;
	}
}

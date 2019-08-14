document.addEventListener('DOMContentLoaded', ()=> {
	new AppMain();
	new TitleBg();
});

class AppMain {
	constructor() {
		this.customer = new Customer();
		this.stageManager = new StageManager();
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
		let stageButton = document.querySelector('[data-icon="star"]');
		let actorButton = document.querySelector('[data-icon="bullets"]');
		let imageButton = document.querySelector('[data-icon="heart"]');
		let audioButton = document.querySelector('[data-icon="audio"]');

		stageButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#stagePanel');
			this.manager = this.stageManager;
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
			$('#type-radio').show();
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
		stageButton.click();
	}

	hideFilter() {
		$('#actorType-select').hide();
		$('#type-radio').hide();
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
		this.listView = document.getElementById('listView');
		this.valueChangedevent = new Event('valueChanged');
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
			this.entity.save(formData).then(data => {
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
		return rec;
	}

	resetPanel(rec = {}) {
		let id = '#' + this.panelId;

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
		let type = $('#type-radio [name="type"]:checked').val();
		let formData = new FormData();

		formData.append('keyword', '');
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
				let anchor = li.querySelector('a');

				anchor.addEventListener('click', ()=> {
					this.resetPanel(this.select(rec));
				});
				this.listView.appendChild(li);
			});
			$(this.listView).listview('refresh');
		});
	}

	createRow(rec, imgsrc = null) {
		rec['href'] = '#' + this.panelId;
		let listviewRow = new ListviewRow(rec, imgsrc);

		return listviewRow.li;
	}
}

/**
 * ステージ.
 */
class StageManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('stagePanel');
		this.form = document.getElementById('stageForm');
		this.entity = new StageEntity();
		this.setupPanel();
	}

	setupPanel() {
		super.setupPanel();
		// Image selection
		let imageButtons = this.form.querySelector('.imageButtons');

		['BG1', 'BG2', 'BG3', 'FG1', 'FG2', 'FG3'].forEach(name => {
			let filter = name.indexOf('B') != -1 ? ImageEntity.Type.BACK : ImageEntity.Type.FORE;
			let button = new ImageSelectionButton(name, filter);

			imageButtons.appendChild(button.fieldset);
		});

		// Audio selection
		let audioButtons = this.form.querySelector('.audioButtons');

		['theme', 'boss'].forEach(name => {
			let button = new AudioSelectionButton(name, AudioEntity.Type.BGM);

			audioButtons.appendChild(button.fieldset);
		});

		// edit map
		let editButton = this.form.querySelector('.ui-icon-edit');

		editButton.addEventListener('click', ()=> {
			let hidden = this.form.querySelector('[name="id"]');
			let id = hidden.value;

			window.open('/stage/edit/' + id);
		});
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
		return '/image/src/' + imageId;
	}

	createRow(rec) {
		return super.createRow(rec, this.getImgsrc(rec));
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
			let button = new ImageSelectionButton(name, ImageEntity.Type.ACT);

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
		return super.createRow(rec, '/image/src/' + rec.imageid);
	}
}

/**
 * イメージ.
 */
class ImageManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('imagePanel');
		this.form = document.getElementById('imageForm');
		this.entity = new ImageEntity();
		this.setupPanel();
	}

	setupPanel() {
		super.setupPanel();
		$('#type-radio [name="type"]').click(()=> {
			this.list();
		});
	}

	createRow(rec) {
		let dic = {0:'Other', 1:'Act', 2:'Back', 3:'Fore'};
		let imgsrc = rec.contentType.startsWith('image') ? '/image/src/' + rec.id : '/img/icon.listview.png';

		rec['count'] = dic[rec.type];
		return super.createRow(rec, imgsrc);
	}

	resetPanel(rec = {}) {
		super.resetPanel(rec);
		let img = document.getElementById('image.thumbnail');

		if (rec.id) {
			img.setAttribute('src', '/image/src/' + rec.id);
		} else {
			img.removeAttribute('src');
		}
	}
}

/**
 * オーディオ.
 */
class AudioManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('audioPanel');
		this.form = document.getElementById('audioForm');
		this.entity = new AudioEntity();
		this.setupPanel();
	}

	setupPanel() {
		super.setupPanel();
		this.audioType = document.querySelector('#audioType [name="audioType"]');
		this.options = this.audioType.querySelectorAll('option');
		this.audioType.addEventListener('change', ()=> {
			this.list();
		});
	}

	select(rec) {
		let webmFile = this.form.querySelector('[name="webm"]');
		let webmAnchor = document.getElementById('webmAnchor');
		let audioFile = this.form.querySelector('[name="audio"]');
		let audioAnchor = document.getElementById('audioAnchor');

		$.mobile.loading('show', {textVisible: true});
		this.entity.select(rec.id).then(audio => {
			this.resetPanel(audio);
			if (audio.webmlen) {
				$(webmFile).hide();
				$(webmAnchor).show();
				webmAnchor.setAttribute('href', '/audio/webm/' + rec.id);
			} else {
				$(webmFile).show();
				$(webmAnchor).hide();
			}
			if (audio.audiolen) {
				$(audioFile).hide();
				$(audioAnchor).show();
				audioAnchor.setAttribute('href', '/audio/audio/' + rec.id);
			} else {
				$(audioFile).show();
				$(audioAnchor).hide();
			}
			$.mobile.loading('hide');
		});
		return {};
	}

	createParameter() {
		let type = this.options[this.audioType.selectedIndex].value;
		let formData = new FormData();

		formData.append('keyword', '');
		formData.append('type', type);
		return formData;
	}

	createRow(rec) {
		rec['count'] = this.options[rec.type - 1].textContent;
		let li = super.createRow(rec);
		let anchor = li.querySelector('a');
		let img = li.querySelector('img');

		anchor.removeChild(img);
		return li;
	}
}

/**
 * イメージ選択ダイアログ.
 */
class ImageChooser extends ResourceChooser {
	constructor() {
		super('imageChooser');
		this.entity = new ImageEntity();
	}

	createRow(rec) {
		return super.createRow(rec, '/image/src/' + rec.id);
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
		let img = listviewRow.img;

		anchor.removeChild(img);
		return listviewRow;
	}
}

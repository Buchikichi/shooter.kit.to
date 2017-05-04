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
			$('#type-checkbox').hide();
		});
		actorButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#actorPanel');
			this.manager = this.actorManager;
			this.manager.list();
			$('#type-checkbox').hide();
		});
		imageButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#imagePanel');
			this.manager = this.imageManager;
			this.manager.list();
			$('#type-checkbox').show();
		});
		audioButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#audioPanel');
			this.manager = this.audioManager;
			this.manager.list();
			$('#type-checkbox').hide();
		});
		plusButton.addEventListener('click', ()=> {
			this.manager.resetPanel();
		});
		stageButton.click();
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

	list() {
		let param = {keyword: ''};

		this.listView.textContent = 'Loadling...';
		this.entity.list(param).then(data => {
			this.listView.textContent = null;
			data.forEach(rec => {
				let li = this.createRow(rec);
				let anchor = li.querySelector('a');

				anchor.addEventListener('click', ()=> {
					this.resetPanel(this.select(rec));
				});
				this.listView.append(li);
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
		let imageButtons = this.form.querySelector('.imageButtons');

		super.setupPanel();
		this.buttonMap = {};
		['BG1', 'BG2', 'BG3', 'FG1', 'FG2', 'FG3'].forEach(name => {
			let filter = name.indexOf('B') != -1 ? 'back' : 'fore';
			let button = new ImageSelectionButton(name, filter);
			let field = button.hidden.getAttribute('name');

			this.buttonMap[field] = button;
			imageButtons.append(button.fieldset);
		});
		// edit map
		let editButton = this.form.querySelector('.ui-icon-edit');

		editButton.addEventListener('click', ()=> {
			let hidden = this.form.querySelector('[name="id"]');
			let id = hidden.value;

			window.open('/stage/edit?id=' + id);
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
		return '/image/src?id=' + imageId;
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
		this.form = document.getElementById('actorForm');
		this.entity = new ActorEntity();
		this.setupPanel();
	}

	setupPanel() {
		let imageButtons = this.form.querySelector('.imageButtons');

		super.setupPanel();
		this.buttonMap = {};
		['ImageId'].forEach(name => {
			let button = new ImageSelectionButton(name, 'act');
			let field = button.hidden.getAttribute('name');

			this.buttonMap[field] = button;
			imageButtons.append(button.fieldset);
		});
	}

	createRow(rec) {
		return super.createRow(rec, '/image/src?id=' + rec.imageid);
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

	createRow(rec) {
		let dic = {0:'Other', 1:'Act', 2:'Back', 3:'Fore'};
		rec['count'] = dic[rec.type];
		return super.createRow(rec, '/image/src?id=' + rec.id);
	}

	resetPanel(rec = {}) {
		super.resetPanel(rec);
		let img = document.getElementById('image.thumbnail');

		if (rec.id) {
			img.setAttribute('src', '/image/src?id=' + rec.id);
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
				webmAnchor.setAttribute('href', '/audio/webm?id=' + rec.id);
			} else {
				$(webmFile).show();
				$(webmAnchor).hide();
			}
			if (audio.audiolen) {
				$(audioFile).hide();
				$(audioAnchor).show();
				audioAnchor.setAttribute('href', '/audio/audio?id=' + rec.id);
			} else {
				$(audioFile).show();
				$(audioAnchor).hide();
			}
			$.mobile.loading('hide');
		});
		return {};
	}

	createRow(rec) {
		rec['count'] = rec.type == 0 ? 'FX' : 'BGM';
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
class ImageChooser {
	constructor() {
		this.listView = document.querySelector('#imageChooser > ul');
		this.entity = new ImageEntity();

		let filterOptions = {'act':1, 'back':2, 'fore':3, 'other':0};
		let anchorList = document.querySelectorAll('[href="#imageChooser"]');

		anchorList.forEach(anchor => {
			anchor.addEventListener('click', ()=> {
				let target = anchor.getAttribute('data-target');
				let filter = anchor.getAttribute('data-filter');
				let button = this.manager.buttonMap[target];
				let type = filterOptions[filter];

				this.list(button, type);
			});
		});
	}

	get manager() {
		return AppMain.Instance.manager;
	}

	list(button, type) {
		let param = {type: type};

		this.listView.textContent = 'Loadling...';
		this.entity.list(param).then(data => {
			this.listView.textContent = null;
			data.forEach(rec => {
				let listviewRow = new ListviewRow(rec, '/image/src?id=' + rec.id);

				this.listView.append(listviewRow.li);
				listviewRow.anchor.addEventListener('click', ()=> {
					this.embedId(button, rec.id);
				});
			});
			$(this.listView).listview('refresh');
		});
	}

	embedId(button, id) {
		let hiden = button.hidden;

		hiden.value = id;
		hiden.dispatchEvent(this.manager.valueChangedevent);
		$('#imageChooser').popup('close');
	}
}

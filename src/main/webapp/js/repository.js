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
console.log('AppMain::setupPanel');
		let plusButton = document.querySelector('[data-role="header"] a');
		let stageButton = document.querySelector('[data-icon="star"]');
		let actorButton = document.querySelector('[data-icon="bullets"]');
		let imageButton = document.querySelector('[data-icon="heart"]');
		let audioButton = document.querySelector('[data-icon="audio"]');

		stageButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#stagePanel');
			this.manager = this.stageManager;
			this.manager.list();
		});
		actorButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#actorPanel');
			this.manager = this.actorManager;
			this.manager.list();
		});
		imageButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#imagePanel');
			this.manager = this.imageManager;
			this.manager.list();
		});
		audioButton.addEventListener('click', ()=> {
			plusButton.setAttribute('href', '#audioPanel');
			this.manager = this.audioManager;
			this.manager.list();
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
	}

	get panelId() {
		return this.panel.getAttribute('id');
	}

	setupPanel() {
		this.form.addEventListener('submit', event => {
			event.preventDefault();
			this.entity.save(this.form).then(data => {
				if (data.ok) {
					$(this.panel).panel('close');
				} else {
					$(this.panel).find('.message').text('Saving failed.');
				}
			});
			return false;
		});
	}

	resetPanel(rec = {}) {
		let id = '#' + this.panelId;

		$(id + ' :input').each((ix, input) => {
			let name = input.getAttribute('name');
			let element = $(input);

			if (name) {
				let val = '';

				if (name in rec) {
					val = '' + rec[name];
				}
				if (element.is(':radio')) {
					element.val([val]).checkboxradio('refresh')
				} else {
					element.val(val);
				}
//console.log(name + ':' + val);
			}
		});
	}

	list() {
		let keyword = '';

		$(this.listView).empty();
		this.entity.list(keyword).then(data => {
			data.forEach(rec => {
				let li = this.createRow(rec);

				this.listView.append(li);
			});
			$(this.listView).listview('refresh');
		});
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

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', 'img/icon.listview.png');
		name.innerText = rec.name;
		description.innerText = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		anchor.setAttribute('href', '#' + this.panelId);
		li.append(anchor);
		//
		anchor.addEventListener('click', ()=> {
			this.resetPanel(rec);
		});
		return li;
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

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', '/image/src?id=' + rec.imageid);
		name.innerText = rec.name;
		description.innerText = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		anchor.setAttribute('href', '#' + this.panelId);
		li.append(anchor);
		//
		$(anchor).click(()=>{
			this.resetPanel(rec);
		});
		return li;
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
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', '/image/src?id=' + rec.id);
		name.innerText = rec.name;
		description.innerText = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		anchor.setAttribute('href', '#' + this.panelId);
		li.append(anchor);
		//
		$(anchor).click(()=>{
			this.resetPanel(rec);
		});
		return li;
	}
}

class AudioManager extends RepositoryManager {
	constructor() {
		super();
		this.panel = document.getElementById('audioPanel');
		this.form = document.getElementById('audioForm');
		this.entity = new AudioEntity();
		this.setupPanel();
	}

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		img.setAttribute('src', 'data:image/png;base64,' + rec.image);
		name.innerText = rec.name;
		description.innerText = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		anchor.setAttribute('href', '#' + this.panelId);
		li.append(anchor);
		//
		$(anchor).click(()=>{
			this.resetPanel(rec);
		});
		return li;
	}
}

class ImageChooser {
	constructor() {
		this.listView = document.querySelector('#imageChooser > ul');
		this.entity = new ImageEntity();
		$('[href="#imageChooser"]').click(()=> {
			this.list();
		});
	}

	list() {
		let keyword = '';

		$(this.listView).empty();
		this.entity.list(keyword).then(data => {
			data.forEach(rec => {
				let li = this.createRow(rec);

				this.listView.append(li);
			});
			$(this.listView).listview('refresh');
		});
	}

	createRow(rec) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');
		
		img.setAttribute('src', '/image/src?id=' + rec.id);
		name.innerText = rec.name;
		description.innerText = rec.description;
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		li.append(anchor);
		//
		$(anchor).click(()=>{
			this.embedId(rec.id);
		});
		return li;
	}

	embedId(id) {
		let app = AppMain.Instance;
		let panelId = app.manager.panelId;

		if ('actorPanel') {
			$('#actorPanel [name="imageid"]').val(id);
		}
		$('#imageChooser').popup('close');
	}
}

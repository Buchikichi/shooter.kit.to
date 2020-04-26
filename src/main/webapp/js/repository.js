document.addEventListener('DOMContentLoaded', () => new MediasetEditorMain());

class MediasetEditorMain {
	constructor() {
		this.imageManager = new ImageManager();
		this.audioManager = new AudioManager();
		this.mapManager = new MapManager();
		this.actorManager = new ActorManager();
		this.imageChooser = new ImageChooser();
		this.setupEvents();
	}

	setupEvents() {
		// console.log('MediasetEditorMain::setupEvents');
		let plusButton = document.querySelector('[data-role="header"] a');
		let tabs = document.querySelector('[data-role=tabs]').querySelectorAll('a');
		let managerMap = {
			'imageButton': this.imageManager,
			'audioButton': this.audioManager,
			'mapButton': this.mapManager,
			'actorButton': this.actorManager,
		};

		tabs.forEach(a => {
			let panel = a.getAttribute('data-panel');
			let manager = managerMap[a.id];

			manager.tabButton = a;
			a.addEventListener('click', () => {
				if (panel) {
					plusButton.setAttribute('href', panel);
					$(plusButton).show();
				} else {
					$(plusButton).hide();
				}
				manager.list();
			});
		});
		this.imageManager.tabButton.click();
		new ImageSelector();
	}
}

class RepositoryManager extends PanelBase {
	constructor(panelId, typeSelectionName) {
		super(panelId);
		this.panelId = panelId;
		this.mediasetId = document.getElementById('mediasetId').value;
		this.typeSelect = document.querySelector('[name="' + typeSelectionName + '"]');
		if (this.typeSelect) {
			this.typeSelect.addEventListener('change', () => this.list());
		}
		this.listView = document.getElementById('listView');
		this.valueChangedevent = new Event('valueChanged');
// 		$(this.listView).sortable({
// 			update: (event, ui)=> {
// console.log('item:');
// console.log(ui.item);
// console.log('position:');
// console.log(ui.position);
// 			},
// 		});
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

	select(li) {
		this.dataId = li.getAttribute('data-id');
		console.log('RepositoryManager#select: ' + this.dataId);
		$.mobile.loading('show', { textVisible: true });
		this.entity.select(this.dataId).then(data => {
			this.resetPanel(data);
			$.mobile.loading('hide');
			console.log('MediasetEditorMain#select done.');
		});
		return {};
	}

	onOpen() {
		console.log('RepositoryManager#onOpen');
	}

	onClose() {
		this.resetPanel();
		this.dataId = null;
	}

	resetPanel(rec = {}) {
		this.target = rec;
		rec.mediasetId = this.mediasetId;
		this.panel.querySelectorAll('input, select').forEach(input => {
			let name = input.getAttribute('name');

			if (!name) {
				return;
			}
			let element = $(input);
			let val = rec[name];
			let defaultData = input.getAttribute('data-default');

			if (defaultData && !val) {
				val = defaultData;
			}
//console.log(name + ':' + element.attr('type'));
			if (element.is(':radio')) {
				element.val([val]).checkboxradio('refresh')
			} else if (element.is('select')) {
				element.val(val).selectmenu('refresh', false);
			} else if (element.is(':file')) {
				element.val(null);
			} else {
				element.val(val);
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
		this.entity.list(param).then(doc => {
			listView.textContent = null;
			doc.querySelectorAll('li').forEach(li => {
				let anchor = li.querySelector('a');

				if (anchor) {
					anchor.addEventListener('click', () => this.select(li));
				}
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}
}

/**
 * マップ.
 */
class MapManager extends RepositoryManager {
	constructor() {
		super('mapPanel');
		this.form = document.getElementById('stageForm');
		this.entity = new MapEntity();
		this.setupPanel();
	}

	createParameter() {
		return { criteria: { mediasetId: this.mediasetId } };
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
}

/**
 * アクター.
 */
class ActorManager extends RepositoryManager {
	constructor() {
		super('actorPanel', 'actorType');
		this.form = this.panel.querySelector('form');
		this.entity = new ActorEntity();
		this.setupPanel();
	}

	setupPanel() {
		// let imageButtons = this.form.querySelector('.imageButtons');

		// super.setupPanel();
		// ['ImageId', 'ImageId', 'ImageId'].forEach(name => {
		// 	let button = new ImageSelectionButton(name, VisualEntity.Type.ACT);

		// 	imageButtons.appendChild(button.fieldset);
		// });
	}

	createParameter() {
		let options = this.typeSelect.querySelectorAll('option');
		let type = options[this.typeSelect.selectedIndex].value;

		return { criteria: { mediaset: { id: this.mediasetId }, type: type }, edit: true };
	}
}

/**
 * イメージ.
 */
class ImageManager extends RepositoryManager {
	constructor() {
		super('imagePanel', 'visualType');
		this.form = document.getElementById('imageForm');
		this.entity = new VisualEntity();
		this.createMapButton = document.getElementById('createMapButton');
		this.createActorButton = document.getElementById('createActorButton');
		this.setupPanel();
	}

	setupPanel() {
		super.setupPanel();
		this.createMapButton.addEventListener('click', ()=> this.createmap());
		this.createActorButton.addEventListener('click', ()=> {
			document.getElementById('actorButton').click();
		});
	}

	createmap() {
		let map = {
			mediasetId: this.mediasetId,
			name: this.target.name,
			mainSeq: 0,
			brickSize: 2,
			mapVisualList: [
				{
					seq: 0,
					visualType: this.target.visualType,
					visualSeq: this.target.visualSeq,
				},
			],
		};
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		new MapEntity().save(map).then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Map saved.';
				document.getElementById('mapButton').click();
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}

	createParameter() {
		let options = this.typeSelect.querySelectorAll('option');
		let type = options[this.typeSelect.selectedIndex].value;

		return { criteria: { mediaset: { id: this.mediasetId }, visualType: type } };
	}

	resetPanel(rec = {}) {
		super.resetPanel(rec);
		let hasData = 0 < Object.keys(rec).length;
		let img = document.getElementById('image.thumbnail');

		$(this.createMapButton).hide();
		$(this.createActorButton).hide();
		if (hasData) {
			if (rec.visualType == VisualEntity.Type.Background
					|| rec.visualType == VisualEntity.Type.Foreground) {
				$(this.createMapButton).show();
			}
			$(this.createActorButton).show();
		} else {
			let visualType = this.panel.querySelector('[name=visualType]');

			visualType.value = this.typeSelect.value;
			$(visualType).selectmenu('refresh', false);
		}
		if (rec.id) {
			img.setAttribute('src', '/visual/src/' + rec.id);
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
		super('audioPanel', 'audioType');
		this.form = document.getElementById('audioForm');
		this.entity = new AudioEntity();
		this.setupPanel();
	}

	createParameter() {
		let options = this.typeSelect.querySelectorAll('option');
		let type = options[this.typeSelect.selectedIndex].value;

		return { criteria: { mediaset: { id: this.mediasetId }, audioType: type } };
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

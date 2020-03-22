document.addEventListener('DOMContentLoaded', () => new ActorEditorMain());

class ActorEditorMain extends Matter {
	constructor() {
		super();
		let productId = document.querySelector('[name=productId]').value;
		let actorId = document.querySelector('[name=id]').value;
		let loading = document.getElementById('loading');
		let callback = (loaded, max) => loading.innerHTML = loaded + '/' + max;

		this.view = document.getElementById('view');
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.setRect(256, 256);
		this.mediasetId = document.querySelector('[name=mediasetId]').value;
		Mediaset.create(this.mediasetId).then(mediaset => {
			return mediaset.load().checkLoading(callback);
		}).then(() => {
			return ActorEditor.create(actorId);
		}).then(actor => {
			this.actor = actor;
			this.actor.product = { id: productId };
			loading.parentNode.removeChild(loading);
			this.start();
		});
	}

	get scale() {
		return document.querySelector('[name="scale"]:checked').value;
	}

	start() {
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		let activate = () => {
			this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.scale(this.scale, this.scale);
			this.ctx.translate(this.actor.hW, this.actor.hH);
			this.actor.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

		this.setupEvents();
		activate();
	}

	changeColor() {
		this.fieldMap.brickColor = this.brickColor;
	}

	setupEvents() {
		let changeScale = () => {
			this.canvas.width = this.actor.width * this.scale;
			this.canvas.height = this.actor.height * this.scale;
		};

		changeScale();
		// this.view.addEventListener('scroll',()=> this.fieldMap.setProgress(this.view.scrollLeft));
		// $('[name="color"]').click(()=> this.changeColor());
		$('[name="scale"]').click(() => changeScale());
		document.getElementById('saveButton').addEventListener('click', () => this.saveActor());
		// this.setupPointingDevice();
		new ActorEditorAttrPanel('attrPanel', this.actor);
		new ActorEditorImagePanel('imagePanel', this.actor);
		new ImageSelector(this.mediasetId);
	}

	setupPointingDevice() {
		let canvas = document.getElementById('canvas');
		let isValid = false;
		let touch = e => {
			if (!isValid) {
				return;
			}
			//console.log('scrollTop:' + document.body.scrollTop);
			let x = (this.view.scrollLeft + e.clientX) / this.scale;
			let y = (e.pageY) / this.scale;

			this.fieldMap.touch(x, y, this.brickNum);
		}
		let leave = () => {
			isValid = false;
			this.fieldMap.leave();
		}

		canvas.addEventListener('mousemove', e => touch(e));
		canvas.addEventListener('mousedown', e => {
			isValid = true;
			if (this.brickColor == '-') {
				document.querySelectorAll('[name="color"]')[0].click();
			}
			touch(e);
		});
		canvas.addEventListener('mouseup', () => leave());
		canvas.addEventListener('mouseleave', () => leave());
	}

	saveActor() {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', { text: 'Save...', textVisible: true });
		this.actor.save().then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Actor saved.';
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}
}

class ActorEditorAttrPanel extends PanelBase {
	constructor(panelId, target) {
		super(panelId, target);
	}

	setupEvents() {
		super.setupEvents();
		$('[name=regionType]').change(() => {
			let type = this.panel.querySelector('[name=regionType]:checked');

			this.actor.regionType = type.getAttribute('data-value');
		});
	}
}

class ActorEditorImagePanel extends PanelBase {
	constructor(panelId, target) {
		super(panelId, target);
		this.actorVisualPopup = new ActorVisualPopup('actorVisualPopup');
	}

	setupEvents() {
		let ul = this.panel.querySelector('ul');
		let selectorPopup = document.getElementById('imageSelector');
		let addImageButton = this.panel.querySelector('.imageSelector');

		this.actor = this.target;
		ul.querySelectorAll('li').forEach(li => this.setupMapVisualEvent(li));
		$(selectorPopup).popup({
			afterclose: () => {
				let seq = addImageButton.getAttribute('data-seq');

				if (!seq) {
					return;
				}
				let visual = Mediaset.Instance.getVisualBySeq({ visualSeq: seq });
				// console.log(visual);
				let actorVisual = ActorVisual.create({
					visualSeq: seq,
					name: visual.name,
				}, this.actor);
				let ix = this.actor.actorVisualList.length;

				this.addImage(ul, actorVisual, ix);
				$(ul).listview('refresh');
			}
		});
		$(ul).listview('refresh');
		$(ul).sortable({
			//cancel: '.sortable-item',
			helper: 'clone',
			items: '> li.sortable-item',
			update: (ev, ui) => {
				// console.log('sortable#update');
				this.sortListView(ul);
				$(ul).listview('refresh');
			}
		});
	}

	setupMapVisualEvent(li) {
		let ix = li.getAttribute('data-index');
		// console.log('setupMapVisualEvent|ix:' + ix);
		let actorVisual = this.actor.actorVisualList[ix];
		let anchor = li.querySelector('a');
		let deleteButton = li.querySelector('a:last-child');
		let name = anchor.querySelector('span');
		let visualSeq = li.getAttribute('data-visualSeq');
		let visual = Mediaset.Instance.getVisualBySeq({ visualSeq: visualSeq });

		name.textContent = visual.name;
		anchor.addEventListener('click', () => this.openActorVisualPopup(actorVisual));
		deleteButton.addEventListener('click', () => {
			console.log('delete');
		});
	}

	addImage(ul, actorVisual, ix) {
		// console.log('EditMain#addImage:');
		// console.log(mapVisual);
		let li = document.createElement('li');
		let anchor = document.createElement('a');

		anchor.append(document.createElement('span'));
		li.append(anchor);
		li.append(document.createElement('a'));
		li.setAttribute('data-index', ix);
		li.setAttribute('data-visualSeq', actorVisual.visualSeq);
		li.classList.add('sortable-item');
		ul.append(li);
		this.actor.actorVisualList.push(actorVisual);
		this.setupMapVisualEvent(li);
	}

	sortListView(ul) {
		let lis = ul.querySelectorAll('.sortable-item');

		// console.log('start:' + start);
		this.actor.actorVisualList = Array.prototype.map.call(lis, (li, seq) => {
			let ix = li.getAttribute('data-index');
			let actorVisual = this.actor.actorVisualList[ix];

			li.setAttribute('data-index', seq);
			actorVisual.seq = seq;
			return actorVisual;
		});
	}

	openActorVisualPopup(actorVisual) {
		// console.log('openActorVisualPopup:');
		// console.log(actorVisual);
		this.actorVisualPopup.target = actorVisual;
		this.actorVisualPopup.resetInputs();
	}
}

class ActorVisualPopup extends PanelBase {
	constructor(editorId) {
		super(editorId);
	}
}

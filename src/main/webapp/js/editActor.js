document.addEventListener('DOMContentLoaded', () => new ActorEditorMain());

class ActorEditorMain extends Matter {
	constructor() {
		super();
		let mediasetId = document.querySelector('[name=mediasetId]').value;
		let actorId = document.querySelector('[name=id]').value;
		let loading = document.getElementById('loading');
		let callback = (loaded, max) => loading.innerHTML = loaded + '/' + max;

		this.view = document.getElementById('view');
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.header = document.querySelector('[data-role=header]');
		this.review = false;
//		this.setRect(256, 256);
		Mediaset.create(mediasetId).then(mediaset => {
			this.mediaset = mediaset;
			return mediaset.load().checkLoading(callback);
		}).then(() => {
			return this.mediaset.getActor(actorId, { mediaset: { id: this.mediaset.id } });
		}).then(actor => {
			this.actor = actor;
			// this.actor.mediaset = { id: mediasetId };
			loading.parentNode.removeChild(loading);
			this.start();
		});
	}

	get scale() {
		return document.querySelector('[name="scale"]').value;
	}

	start() {
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		let activate = () => {
			let ox = (this.canvas.width / 2 - this.actor.hW) / this.scale;
			let oy = (this.canvas.height / 2 - this.actor.hH) / this.scale;

			this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			// this.ctx.strokeStyle = 'red';
			// this.ctx.strokeRect(0, 0, this.canvas.width - 1, this.canvas.height - 1);
			this.ctx.scale(this.scale, this.scale);
			this.ctx.translate(ox, oy);
			this.moveAvator();
			this.avator.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

		this.setupEvents();
		this.resetAvator();
		activate();
	}

	setupEvents() {
		let changeBG = () => {
			let color = document.querySelector('[name=background]').value;

			this.view.style.backgroundColor = color;
		};
		let changeScale = () => {
			this.canvas.width = this.actor.width * this.scale;
			this.canvas.height = this.actor.height * this.scale;
		};
		let resize = () => {
			let height = document.body.clientHeight - this.header.clientHeight - 8; // FIXME: for resize canvas.

			// console.log('resize:' + this.view.clientHeight + ':' + document.body.clientHeight);
			// console.log('resize:' + this.view.clientWidth + '/' + this.view.clientWidth);
			this.canvas.width = document.body.clientWidth;
			this.canvas.height = height;
			// this.stopReview();
		};

		this.reviewButton = document.getElementById('reviewButton');
		this.reviewButton.addEventListener('click', () => this.review ? this.stopReview() : this.startReview());
//		changeScale();
		// this.view.addEventListener('scroll',()=> this.fieldMap.setProgress(this.view.scrollLeft));
		document.querySelector('[name="background"]').addEventListener('change', () => changeBG());
//		document.querySelector('[name="scale"]').addEventListener('change', () => changeScale());
		document.getElementById('saveButton').addEventListener('click', () => this.saveActor());
		window.addEventListener('resize', resize);
		resize();
		// this.setupPointingDevice();
		new ActorEditorAttrPanel('attrPanel', this.actor);
		new ActorEditorImagePanel('imagePanel', this.actor);
		new BehaviorPage('behaviorPage', this.actor);
		new AudioSelector();
		new ImageSelector();
		PotController.create();
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

	resetAvator() {
		let ox = (this.canvas.width / 2 - this.actor.hW) / this.scale;
		let oy = (this.canvas.height / 2 - this.actor.hH) / this.scale;

		this.avator = ActorEditor.create(this.actor);
		this.avator.x = 0;
		this.avator.y = 0;
	}

	moveAvator() {
		if (!this.review) {
			return;
		}
		let width = this.canvas.width / this.scale;
		let hW =  this.canvas.width / 2 / this.scale;
		let target = { x: 0, y: 0 };

		this.avator.move(target);
		if (this.avator.x < -hW) {
			this.avator.x += width;
		} else if (hW < this.avator.x) {
			this.avator.x -= width;
		}
	}

	startReview() {
		this.reviewButton.classList.remove('ui-icon-power');
		this.reviewButton.classList.add('ui-icon-minus');
		this.review = true;
		this.resetAvator();
	}

	stopReview() {
		this.reviewButton.classList.remove('ui-icon-minus');
		this.reviewButton.classList.add('ui-icon-power');
		this.review = false;
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

			this.target.regionType = type.getAttribute('data-value');
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
			afteropen: () => addImageButton.value = '',
			afterclose: () => {
				let seq = addImageButton.value;

				if (!seq) {
					return;
				}
				let visual = Mediaset.Instance.getVisualBySeq({ visualSeq: seq });
				let ix = this.actor.actorVisualList.length;
				// console.log(visual);
				let actorVisual = ActorVisual.create({
					seq: ix,
					visualSeq: seq,
					name: visual.name,
				}, this.actor);

				this.addImage(ul, actorVisual);
				$(ul).listview('refresh');
			}
		});
		$(ul).listview('refresh');
		$(ul).sortable({
			//cancel: '.sortable-item',
			helper: 'clone',
			items: '> li.sortable-item',
			update: (ev, ui) => this.sortListView(ul)
		});
	}

	setupMapVisualEvent(li) {
		let ix = li.getAttribute('data-index');
		let actorVisual = this.actor.actorVisualList[ix];
		let anchor = li.querySelector('a');
		let deleteButton = li.querySelector('a:last-child');
		let name = anchor.querySelector('span');
		let visualSeq = li.getAttribute('data-visualSeq');
		let visual = Mediaset.Instance.getVisualBySeq({ visualSeq: visualSeq });

		name.textContent = visual.name;
		anchor.addEventListener('click', () => this.actorVisualPopup.open(actorVisual));
		deleteButton.addEventListener('click', () => {
			let dataIndex = li.getAttribute('data-index');

			this.actor.actorVisualList = this.actor.actorVisualList.filter(v => v.seq != dataIndex);
			li.parentNode.removeChild(li);
		});
	}

	addImage(ul, actorVisual) {
		// console.log('EditMain#addImage:');
		// console.log(mapVisual);
		let li = document.createElement('li');
		let anchor = document.createElement('a');

		anchor.append(document.createElement('span'));
		li.append(anchor);
		li.append(document.createElement('a'));
		li.setAttribute('data-index', actorVisual.seq);
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
		$(ul).listview('refresh');
	}
}

class ActorVisualPopup extends PanelBase {
	constructor(editorId) {
		super(editorId);
	}
}

class BehaviorPage extends PanelBase {
	constructor(pageId, target) {
		super(pageId, target);
	}
}

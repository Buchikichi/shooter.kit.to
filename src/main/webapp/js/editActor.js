document.addEventListener('DOMContentLoaded', ()=> new ActorEditorMain());

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
		let activate = ()=> {
			this.ctx.save();
			this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
			this.ctx.scale(this.scale, this.scale);
			this.ctx.translate(this.hW, this.hH);
			this.actor.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

		this.changeScale();
		this.setupEvents();
		activate();
	}

	changeColor() {
		this.fieldMap.brickColor = this.brickColor;
	}

	changeScale() {
		this.canvas.width = this.width * this.scale;
		this.canvas.height = this.height * this.scale;
		this.ctx.width = this.canvas.width;
		this.ctx.height = this.canvas.height;
	}

	setupEvents() {
		// this.view.addEventListener('scroll',()=> this.fieldMap.setProgress(this.view.scrollLeft));
		// $('[name="color"]').click(()=> this.changeColor());
		$('[name="scale"]').click(()=> this.changeScale());
		document.getElementById('saveButton').addEventListener('click', ()=> this.saveActor());
		this.setupAttrPanel();
		this.setupImagePanel();
		// this.setupBrickPanel();
		// this.setupPointingDevice();
		new ImageSelector(this.mediasetId);
	}

	setupAttrPanel() {
		let className = imagePanel.querySelector('[name=className]');

		className.addEventListener('change', () => this.actor.className = className.value);
	}

	setupImagePanel() {
		let imagePanel = document.getElementById('imagePanel');
		let ul = imagePanel.querySelector('ul');
		let selectorPopup = document.getElementById('imageSelector');
		let addImageButton = imagePanel.querySelector('.imageSelector');

		// this.fieldMap.mapVisualList.forEach((mapVisual, ix) => this.addImage(ul, mapVisual, ix));
		$(selectorPopup).popup({
			afterclose: ()=> {
				let seq = addImageButton.getAttribute('data-seq');

				if (!seq) {
					return;
				}
				let visual = Mediaset.Instance.getVisualBySeq({ visualSeq: seq });
console.log(visual);
				let actorVisual = ActorVisual.create({
					visualSeq: seq,
					name: visual.name,
				}, this.actor);
				let ix = this.actor.actorVisualList.length;

				this.addImage(ul, actorVisual, ix);
				this.actor.actorVisualList.push(actorVisual);
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

	addImage(ul, actorVisual, ix) {
		// console.log('EditMain#addImage:');
		// console.log(mapVisual);
		let li = document.createElement('li');
		let anchor = document.createElement('a');
		let span = document.createElement('span');

		span.textContent = actorVisual.name;
		anchor.append(span);
		anchor.addEventListener('click', () => this.openMapVisualPopup(actorVisual));
		li.append(anchor);
		let deleteButton = document.createElement('a');

		deleteButton.addEventListener('click', () => {
			console.log('delete');
		});
		li.append(deleteButton);
		li.setAttribute('data-index', ix);
		li.classList.add('sortable-item');
		ul.append(li);
	}

	sortListView(ul) {
		let lis = ul.querySelectorAll('.sortable-item');

		// console.log('start:' + start);
		this.actor.actorVisualList = Array.prototype.map.call(lis, (li, seq) => {
			let ix = li.getAttribute('data-index');
			let actorVisual = this.actor.actorVisualList[ix];
			let count = li.querySelector('.ui-li-count');

			li.setAttribute('data-index', seq);
			actorVisual.seq = seq;
			count.textContent = seq;
			return actorVisual;
		});
	}

	openMapVisualPopup(mapVisual) {
		let mapVisualPopup = document.getElementById('mapVisualPopup');
		let repeat = mapVisualPopup.querySelector('[name=repeat]');
		let radian = mapVisualPopup.querySelector('[name=radian]');
		let speed = mapVisualPopup.querySelector('[name=speed]');
		let blink = mapVisualPopup.querySelector('[name=blink]');

		repeat.value = mapVisual.repeat;
		radian.value = mapVisual.radian;
		speed.value = mapVisual.speed;
		blink.value = mapVisual.blink;
		$(mapVisualPopup).popup('open');
		$(mapVisualPopup).popup({
			afterclose: () => {
				// console.log('mapVisualPopup.afterclose');
				mapVisual.repeat = parseInt(repeat.value);
				mapVisual.radian = parseFloat(radian.value);
				mapVisual.speed = parseFloat(speed.value);
				mapVisual.blink = parseFloat(blink.value);
			}
		});
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
		let leave = ()=> {
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
		canvas.addEventListener('mouseup', ()=> leave());
		canvas.addEventListener('mouseleave', ()=> leave());
	}

	saveActor() {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
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

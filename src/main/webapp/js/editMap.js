document.addEventListener('DOMContentLoaded', ()=> new EditMain());

class EditMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		let mapId = document.getElementById('mapId').value;
		let loading = document.getElementById('loading');
		let callBack = (loaded, max) => loading.innerHTML = loaded + '/' + max;

		this.view = document.getElementById('view');
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		FieldMapEditor.create(mapId, callBack).then(fieldMap => {
			this.fieldMap = fieldMap;
			loading.parentNode.removeChild(loading);
			this.start();
		});
	}

	get brickColor() {
		return document.querySelector('[name="color"]:checked').value;
	}

	get scale() {
		return document.querySelector('[name="scale"]:checked').value;
	}

	get brickNum() {
		return parseInt(document.querySelector('[name="brick"]:checked').value);
	}

	start() {
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		let activate = ()=> {
			this.ctx.save();
			this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
			this.ctx.scale(this.scale, this.scale);
			this.fieldMap.draw(this.ctx);
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
		let mainVisual = this.fieldMap._mainVisual;

		this.canvas.width = mainVisual.image.width * this.scale;
		this.canvas.height = mainVisual.image.height * this.scale;
		this.ctx.width = this.canvas.width;
		this.ctx.height = this.canvas.height;
		this.fieldMap.scale = this.scale;
	}

	setupEvents() {
		this.view.addEventListener('scroll',()=> this.fieldMap.setProgress(this.view.scrollLeft));
		$('[name="color"]').click(()=> this.changeColor());
		$('[name="scale"]').click(()=> this.changeScale());
		document.getElementById('saveButton').addEventListener('click', ()=> this.saveMap());
		this.setupImagePanel();
		this.setupBrickPanel();
		this.setupPointingDevice();
		new ImageSelector(this.fieldMap._mediaset.id);
	}

	setupImagePanel() {
		let imagePanel = document.getElementById('imagePanel');
		let mapName = imagePanel.querySelector('[name=name]');
		let ul = imagePanel.querySelector('ul');
		let selectorPopup = document.getElementById('imageSelector');
		let addImageButton = imagePanel.querySelector('.imageSelector');

		mapName.addEventListener('change',()=> this.fieldMap.name = mapName.value);
		this.fieldMap.mapVisualList.forEach((mapVisual, ix) => this.addImage(ul, mapVisual, ix));
		$(selectorPopup).popup({
			afterclose: ()=> {
				let seq = addImageButton.getAttribute('data-seq');

				if (!seq) {
					return;
				}
				let mapVisual = MapVisual.create({
					_fieldMap: this.fieldMap,
					mapId: this.fieldMap.id,
					visualSeq: seq,
				});
				let ix = this.fieldMap.mapVisualList.length;

				this.addImage(ul, mapVisual, ix);
				this.fieldMap.mapVisualList.push(mapVisual);
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
				this.sortMapVisual(ul);
				$(ul).listview('refresh');
			}
		});
	}

	addImage(ul, mapVisual, ix) {
		// console.log('EditMain#addImage:');
		// console.log(mapVisual);
		let li = document.createElement('li');
		let anchor = document.createElement('a');
		let span = document.createElement('span');

		span.textContent = mapVisual.imageName;
		anchor.append(span);
		anchor.addEventListener('click', ()=> this.openMapVisualPopup(mapVisual));
		li.append(anchor);
		if (mapVisual.isMain) {
			let mark = document.createElement('span');

			mark.textContent = '*';
			mark.classList.add('ui-li-count');
			anchor.append(mark);
		} else {
			let deleteButton = document.createElement('a');

			deleteButton.addEventListener('click', ()=> {
				console.log('delete');
			});
			li.append(deleteButton);
		}
		li.setAttribute('data-index', ix);
		li.classList.add('sortable-item', 'mapVisual');
		if (mapVisual.seq <= 0) {
			let fg = ul.querySelector('.sortable-item.ui-state-disabled');

			ul.insertBefore(li, fg)
		} else {
			ul.append(li);
		}
	}

	sortMapVisual(ul) {
		let list = [];
		let lis = ul.querySelectorAll('.mapVisual');
		let fgs = ul.querySelectorAll('li.fg ~ *').length;
		let start = fgs - lis.length + 1;

		// console.log('start:' + start);
		lis.forEach((li, seq) => {
			let ix = li.getAttribute('data-index');
			let mapVisual = this.fieldMap.mapVisualList[ix];

			mapVisual.seq = start + seq;
			mapVisual.z = mapVisual.seq * 10000 - 1;
			if (mapVisual.isMain) {
				this.fieldMap.mainSeq = mapVisual.seq;
			}
			// console.log('seq:' + mapVisual.seq + '/z:' + mapVisual.z);
			list.push(mapVisual);
		});
		this.fieldMap.mapVisualList = list;
	}

	setupBrickPanel() {
		let brickSize = document.getElementById('brickSize');

		brickSize.addEventListener('change',()=> this.fieldMap.brickSize = brickSize.value);
		// generateButton
		document.getElementById('generateButton').addEventListener('click', ()=> {
			if (!confirm('Sure?')) {
				return;
			}
			this.fieldMap.generateBrick(this.ctx);
		});
		// generateButton
		document.getElementById('clearButton').addEventListener('click', ()=> {
			if (!confirm('Sure?')) {
				return;
			}
			this.fieldMap.clear();
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

	saveMap() {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		this.fieldMap.save().then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Stage saved.';
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}
}

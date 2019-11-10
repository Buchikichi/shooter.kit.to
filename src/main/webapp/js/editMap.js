document.addEventListener('DOMContentLoaded', ()=> {
	new EditMain();
});

class EditMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		let meidasetId = document.getElementById('mediasetId').value;
		let mapId = document.getElementById('mapId').value;

		this.view = document.getElementById('view');
		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		Mediaset.create(meidasetId).then(mediaset => {
			mediaset.loadVisual();
			return FieldMapEditor.create(mapId);
		}).then(fieldMap => {
			this.fieldMap = fieldMap;
			this.checkLoading();
		});
	}

	get scale() {
		return document.querySelector('[name="scale"]:checked').value;
	}

	get isMove() {
		return $('[name="behavior"]:checked').val() == 'm';
	}

	get isBrick() {
		return $('[name="behavior"]:checked').val() == 'b';
	}

	get brickNum() {
		return parseInt(document.querySelector('[name="brick"]:checked').value);
	}

	checkLoading() {
		let loading = document.getElementById('loading');

		Mediaset.Instance.checkLoading((loaded, max) => {
			let msg = loaded + '/' + max;

			loading.innerHTML = msg;
		}).then(()=> {
			loading.parentNode.removeChild(loading);
			this.start();
		});
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
		// Scale
		$('[name="scale"]').click(()=> this.changeScale());
		// Brick
		$('[name="behavior"]:eq(1)').click(()=> $('#brickPanel').panel('open'));
		// saveButton
		document.getElementById('saveButton').addEventListener('click', ()=> this.saveMap());
		// mapFile
		let mapFile = document.getElementById('mapFile');

		mapFile.addEventListener('change',()=> {
			let file = mapFile.files[0];
			let url = window.URL.createObjectURL(file);

			landform.loadMapData(url);
		});
		// generateButton
		let generateButton = document.getElementById('generateButton');
		generateButton.addEventListener('click',()=> {
			let ctx = FlexibleView.Instance.ctx;

			landform.generateBrick(ctx);
		});
		//
		this.setupImagePanel();
		this.setupPointingDevice();
	}

	setupImagePanel() {
		let imagePanel = document.getElementById('imagePanel');
		let ul = document.querySelector('ul');
//      <li>
//        <a href="#">aa<span class="ui-li-count">*</span></a>
//        <a href="#"></a>
//      </li>

		this.fieldMap.mapVisualList.forEach(mapVisual => {
			let li = document.createElement('li');
			let anchor = document.createElement('a');
			let deleteButton = document.createElement('a');

			anchor.href = '#';
			anchor.textContent = mapVisual.imageName;
//			anchor.append(mapVisual.image);
			li.append(anchor);
			li.append(deleteButton);
			ul.append(li);
		});
		$(ul).listview('refresh');
		$(ul).sortable();
	}

	setupPointingDevice() {
		let canvas = document.getElementById('canvas');
		let isValid = false;
		let touch = e => {
			if (!isValid) {
				return;
			}
console.log('scrollTop:' + document.body.scrollTop);
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

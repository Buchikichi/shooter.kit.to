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

		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.fieldMap = new FieldMapEditor();
		Mediaset.Instance.loadVisual(meidasetId).then(()=> {
			this.fieldMap.load(mapId).then(()=> {
				this.checkLoading();
			});
		});
	}

	get isMove() {
		return $('[name="behavior"]:checked').val() == 'm';
	}

	get isBrick() {
		return $('[name="behavior"]:checked').val() == 'b';
	}

	checkLoading() {
		let loading = document.getElementById('loading');
		let repositories = [VisualManager.Instance/*, AudioMixer.INSTANCE*/];
		let checkLoading = ()=> {
			let loaded = 0;
			let max = 0;
			let isComplete = true;

			repositories.forEach(repo => {
				loaded += repo.loaded;
				max += repo.max;
				isComplete &= repo.isComplete();
			});
			let msg = loaded + '/' + max;

			loading.innerHTML = msg;
			if (isComplete) {
				loading.parentNode.removeChild(loading);
				this.start();
				return;
			}
			setTimeout(checkLoading, 125);
		};
		checkLoading();
	}

	start() {
//		let view = FlexibleView.Instance;
//		let landform = this.field.landform;
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//			let delta = this.controller.delta;
//			let move = this.controller.move;
//			let point = this.controller.point;

//			landform.target = null;
//			landform.which = false;
//			if (move) {
//				landform.target = move;
//			}
//			if (delta) {
//				if (this.isMove) {
//					landform.selection = '0';
//					this.moveLandform(delta);
//				}
//				if (this.isBrick) {
//					landform.which = true;
//				}
//			}
//			view.clear();
//			this.field.draw();
			this.ctx.save();
			this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
			this.ctx.scale(2, 2);
			this.fieldMap.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};
this.canvas.width = 2048;
this.canvas.height = 2048;
this.ctx.width = this.canvas.width;
this.ctx.height = this.canvas.height;

//console.log('start!:' + landform.stage.fg.width);
//		this.controller = new Controller();
		this.brickPanel = new BrickPanel(this.field);
//		landform.isEdit = true;
//		landform.loadStage(this.stage);
		activate();
		this.setupEvents();
	}

	setupEvents() {
		// Brick
		$('[name="behavior"]:eq(1)').click(() => {
			this.brickPanel.open();
		});
		// saveButton
		let saveButton = document.getElementById('saveButton');

		saveButton.addEventListener('click', ()=> {
			this.saveMap();
		});
		// mapFile
		let mapFile = document.getElementById('mapFile');

		mapFile.addEventListener('change', ()=> {
			let file = mapFile.files[0];
			let url = window.URL.createObjectURL(file);

			landform.loadMapData(url);
		});
		// generateButton
		let generateButton = document.getElementById('generateButton');
		generateButton.addEventListener('click', ()=> {
			let ctx = FlexibleView.Instance.ctx;

			landform.generateBrick(ctx);
		});
		//
		this.setupPointingDevice();
	}

	moveLandform(delta) {
		let landform = this.field.landform;
		let dx = parseInt(delta.x / Landform.BRICK_WIDTH);
		let dy = parseInt(delta.y / Landform.BRICK_WIDTH);

		if (dy != 0) {
			landform.wheel(dy);
		}
//		this.controller.decPoint(dx * Landform.BRICK_WIDTH, dy * Landform.BRICK_WIDTH);
	}

	setupPointingDevice() {
		let canvas = document.getElementById('canvas');

		canvas.addEventListener('mousemove', event => {
		});
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

class BrickPanel {
	constructor(field) {
		this.field = field;
		this.panel = document.getElementById('brickPanel');
		$('[name="brick"]').click(()=> {
			let val = $('[name="brick"]:checked').val();
			let landform = this.field.landform;

			landform.selection = val;
		});
	}

	open() {
		$(this.panel).panel('open');
	}
}




// ↓古い
/*(function() {
	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');
	let slider = $('#slider');
	let field = new Field(512, 224);
	let landform = new Landform(canvas, true);

	new Controller(true);
	$('#bg').change(function() {
		let file = this.files[0];

		landform.load(file);
	});
	$(landform.img).load(function() {
		slider.val(0);
		slider.attr('max', this.width / Landform.BRICK_WIDTH);
		slider.slider('refresh');
	});
	slider.change(function() {
		let fg = landform.stage.fg;

		fg.x = slider.val() * Landform.BRICK_WIDTH;
	});
	$('#generateButton').click(function() {
		landform.generateBrick(ctx);
	});
	$('#map').change(function() {
		let file = this.files[0];

		landform.loadMapData(file);
	});
	setupActorList(landform);
	setupMouse(landform);
	window.addEventListener('resize', ()=> {
		field.resize();
	});
landform.loadStage(new Stage(Stage.SCROLL.LOOP, 'stage1.map.png', [ new StageFg('stage1.1.0.png') ]));
	let activate = function() {
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		landform.draw();
		requestAnimationFrame(activate);
	};
	activate();
});
//*/

function setupMouse(landform) {
	let canvas = $(landform.canvas);

	canvas.mousedown(function(e) {
		let magni = landform.magni;

		landform.target = {x: e.offsetX / magni, y: e.offsetY / magni};
		landform.which = e.which;
	});
	canvas.mousemove(function(e) {
		let magni = landform.magni;

		landform.target = {x: e.offsetX / magni, y: e.offsetY / magni};
	});
	canvas.mouseup(function() {
		landform.which = null;
	});
	canvas.mouseleave(function() {
		landform.target = null;
	});
	let mousewheelevent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
	canvas.on(mousewheelevent,function(e){
		e.preventDefault();
		let delta = e.originalEvent.deltaY ? -(e.originalEvent.deltaY) : e.originalEvent.wheelDelta ? e.originalEvent.wheelDelta : -(e.originalEvent.detail);

		landform.wheel(delta);
	});
}

document.addEventListener('DOMContentLoaded', ()=> {
	new EditMain();
});

class EditMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		let stageId = document.getElementById('stageId').value;

		this.loadStage(stageId);
	}

	loadStage(stageId) {
		let stageEntity = new StageEntity();

		stageEntity.select(stageId).then(rec => {
			this.field = new Field(512, 224);
			this.setupStage(rec);
//			this.setupActors(rec);
			this.checkLoading();
		});
	}

	setupStage(rec) {
		let form = document.getElementById('inputBox');
		let view = Stage.createViewList(rec);
		let propList = {
			'speed':{min:0, max:1, step:0.1},
			'dir':{min:0, max:1, step:0.01},
			'blink':{min:0, max:1, step:0.01},
		}

		this.stage = new Stage(Stage.SCROLL.LOOP, rec.map, view);
		Stage.VIEWS.forEach(key => {
			let imageId = rec[key];

			if (!imageId || imageId.length == 0) {
				return;
			}
			let fieldset = document.createElement('fieldset');
			let legend = document.createElement('legend');

			legend.textContent = key.toUpperCase() + ':';
			fieldset.append(legend);
			Object.keys(propList).forEach(prop => {
				let attr = propList[prop];
				let name = key + prop;
				let input = document.createElement('input');

				input.setAttribute('type', 'number');
				input.setAttribute('name', name);
				Object.keys(attr).forEach(attrName => {
					input.setAttribute(attrName, attr[attrName]);
				});
				input.value = rec[name];
				input.addEventListener('change', ()=> {
					let ground = this.stage.getGround(key);

					ground[prop] = input.value;
				});
				fieldset.append(input);
				$(input).textinput();
			});
			form.append(fieldset);
			$(fieldset).controlgroup({mini: true});
		})
	}

	checkLoading() {
		let loading = document.getElementById('loading');
		let repositories = [ImageManager.Instance, AudioMixer.INSTANCE, MotionManager.INSTANCE];
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
		let view = FlexibleView.Instance;
		let controller = new Controller();
		let landform = this.field.landform;
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

			view.clear();
			this.field.draw();
			requestAnimationFrame(activate);
		};

//console.log('start!:' + landform.stage.fg.width);
		landform.isEdit = true;
		landform.loadStage(this.stage);
		activate();
		this.setupEvents();
	}

	setupEvents() {
		let slider = $('#slider');
		let landform = this.field.landform;

		slider.change(()=> {
			let x = slider.val() * Landform.BRICK_WIDTH;

			landform.stage.moveH(x);
		});
		slider.attr('max', landform.stage.fg.width / Landform.BRICK_WIDTH);
		slider.slider('refresh');
	}
}



// ↓古い
(function() {
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

function setupActorList(landform) {
	let actorList = $('#actorList');
	let container = actorList.controlgroup('container');

	Enemy.LIST.forEach(function(rec, ix) {
		let id = 'actor' + ix;
		let input = $('<input type="radio" name="actor"/>').attr('id', id).val(ix + 1);
		let label = $('<label></label>').text(rec.name).attr('for', id);
		let img = $('<img/>').attr('src', 'img/' + rec.img);

		label.css('background-image', 'url("./img/' + rec.img + '")');
		if (rec.h) {
			img.attr('width', rec.h);
			img.attr('height', rec.h);
		}
		rec.instance = new rec.type(landform);
		container.append(input);
		container.append(label.prepend(img));
	});
	actorList.parent().trigger('create');
	actorList.find('input').click(function() {
		landform.selection = this.value;
	});
}

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

document.addEventListener('DOMContentLoaded', ()=> {
	new EditMain();
});

class EditMain {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		this.stageId = document.getElementById('stageId').value;
		this.detailId = document.getElementById('detailId').value;
		this.isDetail = 0 < this.detailId.length;
		if (this.isDetail) {
			this.loadDetail();
			return;
		}
		this.loadStage();
	}

	get isMove() {
		return $('[name="behavior"]:checked').val() == 'm';
	}

	get isBrick() {
		return $('[name="behavior"]:checked').val() == 'b';
	}

	get isActor() {
		return $('[name="behavior"]:checked').val() == 'a';
	}

	loadStage() {
		this.stageEntity = new StageEntity();
		this.stageEntity.select(this.stageId).then(rec => {
			this.field = new FieldEditor(512, 224);
			this.setupStage(rec, rec.map);
//			this.setupActors(rec);
			this.checkLoading();
		});
	}

	loadDetail() {
		this.productEntity = new ProductEntity();
		this.productEntity.detail(this.detailId).then(rec => {
			let detailList = rec.detailList;
			let detail = null;

			this.product = rec;
			detailList.forEach(productDetail => {
				if (productDetail.id != this.detailId) {
					return;
				}
				detail = productDetail;
			});
			let stage = detail.stage;
			let map = detail.map ? detail.map : stage.map;

			this.field = new FieldEditor(512, 224);
			this.setupStage(stage, map);
			this.checkLoading();
		});
	}

	setupStage(rec, map) {
		let form = document.getElementById('inputBox');
		let view = Stage.createViewList(rec);
		let propList = {
			'speed':{min:0, max:1, step:0.1},
			'dir':{min:0, max:1, step:0.01},
			'blink':{min:0, max:1, step:0.01},
		}

		this.stage = new Stage(Stage.SCROLL.LOOP, map, view);
		Stage.VIEWS.forEach(key => {
			let imageId = rec[key];

			if (!imageId || imageId.length == 0) {
				return;
			}
			let fieldset = document.createElement('fieldset');
			let legend = document.createElement('legend');

			legend.textContent = key.toUpperCase() + ':';
			fieldset.appendChild(legend);
			Object.keys(propList).forEach(prop => {
				let attr = propList[prop];
				let name = key + prop;
				let input = document.createElement('input');
				let value = rec[name].toFixed(2);

				input.setAttribute('type', 'number');
				input.setAttribute('name', name);
				Object.keys(attr).forEach(attrName => {
					input.setAttribute(attrName, attr[attrName]);
				});
				input.value = value;
				input.addEventListener('change', ()=> {
					let ground = this.stage.getGround(key);

					ground[prop] = input.value;
				});
				fieldset.appendChild(input);
				$(input).textinput();
			});
			form.appendChild(fieldset);
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
		let landform = this.field.landform;
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			let delta = this.controller.delta;
			let move = this.controller.move;
			let point = this.controller.point;

			landform.target = null;
			landform.which = false;
			if (move) {
				landform.target = move;
			}
			if (delta) {
				if (this.isMove) {
					landform.selection = '0';
					this.moveLandform(delta);
				}
				if (this.isBrick || this.isActor) {
					landform.which = true;
				}
			}
			view.clear();
			this.field.draw();
			requestAnimationFrame(activate);
		};

//console.log('start!:' + landform.stage.fg.width);
		this.controller = new Controller();
		this.brickPanel = new BrickPanel(this.field);
		if (this.isDetail) {
			this.actorPanel = new ActorPanel(this.field);
			this.actorPanel.setupActors(this.product.actorList);
			this.setupActors(this.product.actorList);
			$('[name="behavior"]:eq(2)').checkboxradio('enable').checkboxradio("refresh");
		}
		landform.isEdit = true;
		landform.loadStage(this.stage);
		activate();
		this.setupEvents();
	}

	setupActors(actorList) {
console.log('#setupActors');
		Enemy.LIST = [
			{name:'', type:Waver, img:''},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Battery', type:Battery, img:'enemy/battery.png'},
			{name:'Bouncer', type:Bouncer, img:'enemy/bouncer.png'},
			{name:'Hanker', type:Hanker, img:'enemy/hanker.png'},
			{name:'Jerky', type:Jerky, img:'enemy/jerky.png'},
			{name:'Juno', type:Juno, img:'enemy/juno.png'},
			{name:'Crab', type:Crab, img:'enemy/crab.png'},
			{name:'Hatch', type:Hatch, img:'enemy/hatch.png', h:16},
			{name:'Charger', type:Charger, img:'enemy/charger.png', h:16},
			{name:'Twister', type:Twister, img:'enemy/twister.png', h:16},
			{name:'Slur', type:Slur, img:'enemy/slur.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},
			{name:'Waver', type:Waver, img:'enemy/waver.png', h:16},

			{name:'Tentacle', type:Tentacle, img:'enemy/tentacle.png'},
			{name:'Dragon', type:DragonHead, img:'enemy/dragonHead.png'},
			{name:'Waver(formation)', type:Waver, img:'enemy/waver.png', h:16, formation: true},
//			{name:'Twister(formation)', type:Twister, img:'enemy/waver.png', h:16, formation: true},

			{name:'Molten', type:Molten, img:'boss/molten.png'},
			{name:'Winding', type:Winding, img:'boss/winding.png'},
			{name:'Titan', type:Titan, img:'boss/titan.icon.png'},
			{name:'Cascade', type:Cascade, img:'material/cascade.icon.png'},
			{name:'Rewinder', type:Rewinder, img:'material/cascade.icon.png'}
		];
		actorList.forEach(productActor => {
			let ix = productActor.seq;
			let actor = productActor.actor;
			let type = eval(productActor.className);
			let formation = Actor.Type.Formation <= ix && ix < Actor.Type.Boss;

console.log(ix + ':' + productActor.className + ':' + actor.name);
//console.log(type);
			Enemy.LIST[ix] = {name:actor.name, type:type, h:16, formation:formation};
		});
		Enemy.LIST.forEach(actor => {
			let dummy = {x:0, y:0};

			actor.instance = new actor.type(dummy);
		});
	}

	setupEvents() {
		let slider = $('#slider');
		let landform = this.field.landform;
		let max = landform.stage.fg.width / Landform.BRICK_WIDTH - 1;

		slider.change(()=> {
			let x = slider.val() * Landform.BRICK_WIDTH;

			landform.stage.moveH(x);
		});
		slider.attr('max', max);
		slider.slider('refresh');
		landform.stage.moveH(0);

		// Brick
		$('[name="behavior"]:eq(1)').click(() => {
			this.brickPanel.open();
		});
		// Actor
		$('[name="behavior"]:eq(2)').click(() => {
			this.actorPanel.open();
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

		if (dx != 0) {
			let slider = $('#slider');
			let min = parseInt(slider.attr('min'));
			let max = parseInt(slider.attr('max'));
			let val = parseInt(slider.val()) - dx;

//console.log('delta:' + delta.x + ' dx:' + dx + ' val:' + val + '(' + max + '/' + min + ')');
			if (val < min) {
				val = min;
			}
			if (max < val) {
				val = max;
			}
			let h = val * Landform.BRICK_WIDTH;

			slider.val(val).slider('refresh');
			landform.stage.moveH(h);
		}
		if (dy != 0) {
			landform.wheel(dy);
		}
		this.controller.decPoint(dx * Landform.BRICK_WIDTH, dy * Landform.BRICK_WIDTH);
	}

	setupPointingDevice() {
		let canvas = document.getElementById('canvas');

		canvas.addEventListener('mousemove', event => {
		});
	}

	saveMap() {
		let save = this.isDetail ? this.saveDetailMap() : this.saveStageMap();
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		save.then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Stage saved.';
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}

	saveStageMap() {
		let attrForm = document.getElementById('attrForm');
		let formData = new FormData(attrForm);
		let landform = this.field.landform;

		formData.append('id', this.stageId);
		formData.append('map', landform.mapImage);
		return this.stageEntity.saveMap(formData);
	}

	saveDetailMap() {
		let formData = new FormData();
		let landform = this.field.landform;

		formData.append('id', this.detailId);
		formData.append('map', landform.mapImage);
		return this.productEntity.saveMap(formData);
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

class ActorPanel {
	constructor(field) {
		this.field = field;
		this.panel = document.getElementById('actorPanel');
	}

	setupActors(actorList) {
		let typeMap = {};

		actorList.forEach(productActor => {
			let type = productActor.type;
			let list = typeMap[type];

			if (!list) {
				list = [];
				typeMap[type] = list;
			}
			list.push(productActor);
		});
		//
		let listView = this.panel.querySelector('[data-role="controlgroup"] > div');

		Actor.TypeList.forEach(typeName => {
			let type = Actor.Type[typeName];
			let list = typeMap[type];

			if (!list) {
				return;
			}
			// <button data-filtertext="Enemy Cats Dogs" class="ui-btn ui-btn-b" disabled="disabled">Enemy</button>
			let enemyType = document.createElement('button');
			let textList = [];

			enemyType.textContent = typeName;
			enemyType.setAttribute('disabled', 'disabled');
			enemyType.classList.add('ui-btn');
			enemyType.classList.add('ui-btn-b');
			enemyType.classList.add('ui-mini');
			textList.push(typeName);
			listView.appendChild(enemyType);
			list.forEach(productActor => {
				let actor = productActor.actor;
				// <div data-filtertext="Enemy Cats"><label>Cats<input type="radio" name="actor" value="1"/></label></div>
				let div = document.createElement('div');
				let label = document.createElement('label');
				let radio = document.createElement('input');
				let img = document.createElement('img');
				let name = actor.name;

//console.log(productActor);
//console.log(actor);
				img.setAttribute('src', '/image/src/' + actor.imageid);
				radio.setAttribute('type', 'radio');
				radio.setAttribute('name', 'actor');
				radio.setAttribute('value', productActor.seq);
				label.appendChild(img);
				label.appendChild(document.createTextNode(name));
				label.appendChild(radio);
				div.classList.add('ui-radio');
				div.setAttribute('data-filtertext', [typeName, name].join(' '));
				div.appendChild(label);
				listView.appendChild(div);
				textList.push(name);
			});
			enemyType.setAttribute('data-filtertext', textList.join(' '));
		});
		this.setupEvent();
		$(listView).parent().trigger('create');
	}

	setupEvent() {
		$('[name="actor"]').click(()=> {
			let val = $('[name="actor"]:checked').val();
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
		container.appendChild(input);
		container.appendChild(label.prepend(img));
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

document.addEventListener('DOMContentLoaded', () => new EditStage());

class EditStage {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		this.stageId = document.getElementById('stageId').value;
		this.view = document.getElementById('view');
		this.frame = document.getElementById('frame');
		this.canvas = document.getElementById('canvas');
		this.footer = document.querySelector('[data-role=footer]');
		this.cursorType = StageEditor.CURSOR_TYPE.NONE;
		this.scenario = null;
		this.loadStage();
	}

	get isMove() {
		return $('[name="behavior"]:checked').val() == 'm';
	}

	get scale() {
		return document.querySelector('[name="scale"]:checked').value;
	}

	// get repeat() {
	// 	return document.querySelector('[name="repeat"]').value;
	// }

	get hasMargin() {
		return this.attrPanel.roll == Stage.SCROLL.OFF || this.attrPanel.roll == Stage.SCROLL.ON;
	}

	loadStage() {
		let productId = document.getElementById('productId').value;
		let loading = document.getElementById('loading');
		let callback = (loaded, max) => loading.innerHTML = loaded + '/' + max;

		Product.create(productId, callback).then(product => {
			this.product = product;
//			let stage = null;

//			this.view = new FlexibleView(512, 224);
//			this.field = new FieldEditor(this.view, stage);
			product.selectStage(this.stageId);
//			this.setupStage(stage);
			loading.parentNode.removeChild(loading);
			this.setupEvents();
			this.resetCanvas();
			this.start();
		});
	}

	resetCanvas() {
		let product = this.product;
		let stage = product.stage;
		let scale = this.scale;
		let width = product.width / 2 * stage.posV + stage.length;
		let height = stage.height + (this.hasMargin ? product.height * 2 : 0);
		let frameWidth = width * scale;
		let frameHeight = height * scale;

		this.frame.style.width = frameWidth + 'px';
		this.frame.style.height = frameHeight + 'px';
		this.canvas.width = width;
		this.canvas.height = height;
		this.canvas.style.transformOrigin = 'left top';
		this.canvas.style.transform = 'scale(' + scale + ', ' + scale + ')';
		// console.log('stage width:' + this.canvas.width + '/height:' + this.canvas.height);
		this.ctx = this.canvas.getContext('2d');
	}

	// setupStage(stage) {
	// 	let form = document.getElementById('inputBox');
	// 	let propList = {
	// 		'speed':{min:0, max:1, step:0.1},
	// 		'dir':{min:0, max:1, step:0.01},
	// 		'blink':{min:0, max:1, step:0.01},
	// 	}

	// 	this.stage = Stage.create(stage);
	// 	Stage.VIEWS.forEach(key => {
	// 		let imageId = stage[key];

	// 		if (!imageId || imageId.length == 0) {
	// 			return;
	// 		}
	// 		let fieldset = document.createElement('fieldset');
	// 		let legend = document.createElement('legend');

	// 		legend.textContent = key.toUpperCase() + ':';
	// 		fieldset.appendChild(legend);
	// 		Object.keys(propList).forEach(prop => {
	// 			let attr = propList[prop];
	// 			let name = key + prop;
	// 			let input = document.createElement('input');
	// 			let value = stage[name].toFixed(2);

	// 			input.setAttribute('type', 'number');
	// 			input.setAttribute('name', name);
	// 			Object.keys(attr).forEach(attrName => {
	// 				input.setAttribute(attrName, attr[attrName]);
	// 			});
	// 			input.value = value;
	// 			input.addEventListener('change', ()=> {
	// 				let ground = this.stage.getGround(key);

	// 				ground[prop] = input.value;
	// 			});
	// 			fieldset.appendChild(input);
	// 			$(input).textinput();
	// 		});
	// 		form.appendChild(fieldset);
	// 		$(fieldset).controlgroup({mini: true});
	// 	})
	// }

	start() {
//		let view = FlexibleView.Instance;
//		let landform = this.field.landform;
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			let delta = this.controller.delta;
			let move = this.controller.move;
			let point = this.controller.point;

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
//				if (this.isActor) {
//					landform.which = true;
//				}
//			}
//			view.clear();
//			product.draw(view.ctx);
			this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//			this.ctx.scale(this.scale, this.scale);
			this.product.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

		console.log('EditStage#start');
		activate();
	}

	setupDummyActors() {
console.log('EditStage#setupDummyActors:');
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
// 		actorList.forEach(actor => {
// 			let ix = actor.seq;
// 			let type = eval(actor.className);
// 			let formation = Actor.Type.Formation <= ix && ix < Actor.Type.Boss;

// console.log(ix + ':' + actor.className);
// //console.log(type);
// 			Enemy.LIST[ix] = {name:actor.name, type:type, h:16, formation:formation};
// 		});
		Enemy.LIST.forEach(actor => {
			let dummy = {x:0, y:0};

			actor.instance = new actor.type(dummy);
		});
	}

	setupEvents() {
console.log('EditStage#setupEvents');
		let stage = this.product.stage;
		let changeGuide = ()=> {
			stage.hasGuide = document.querySelector('[name="guide"]:checked').value == '1';
		};
		let changeColor = ()=> {
			stage.map.brickColor = document.querySelector('[name="color"]:checked').value;
		};
		let resize = ()=> {
			let height = window.innerHeight - this.footer.clientHeight - 8;
// console.log('resize:' + window.innerHeight);
// console.log('footer:' + this.footer.clientHeight);
			this.view.style.height = height + 'px';
		};

//		this.controller = new Controller();
		this.attrPanel = new AttrPanel(this);
		this.actorPanel = new ActorPanel(this);
		this.eventPanel = new EventPanel(this);
		this.setupDummyActors();
		stage.setProgress(0);

		$('[name="behavior"]:eq(0)').click(()=> this.actorPanel.open());
		$('[name="behavior"]:eq(1)').click(()=> this.eventPanel.open());
		$('[name="behavior"]:eq(2)').click(()=> this.cursorType = StageEditor.CURSOR_TYPE.REMOVE);
		// $('[name="behavior"]:eq(2)').checkboxradio('enable').checkboxradio("refresh");
		$('[name="guide"]').click(()=> changeGuide());
		$('[name="scale"]').click(()=> this.resetCanvas());
		$('[name="color"]').click(()=> changeColor());
		document.getElementById('saveButton').addEventListener('click', ()=> this.saveMap());
		window.addEventListener('resize', resize);
		//
		changeGuide();
		changeColor();
		resize();
		this.setupPointingDevice();
		new AudioSelector(this.product._mediaset);
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
			landform.stage.setProgress(h);
		}
		if (dy != 0) {
			landform.wheel(dy);
		}
		this.controller.decPoint(dx * Landform.BRICK_WIDTH, dy * Landform.BRICK_WIDTH);
	}

	setupPointingDevice() {
		let product = this.product;
		let stage = product.stage;
		let canvas = document.getElementById('canvas');
		let calcPos = e => {
			let scrollLeft = this.view.scrollLeft / this.scale;
			let scrollTop = this.view.scrollTop;
			let width = this.view.clientWidth / this.scale;
			let x = -stage.startPos + scrollLeft + e.clientX / this.scale;
			let y = (scrollTop + e.clientY) / this.scale - (this.hasMargin ? product.height : 0);

			return { x: x, y: y, scrollLeft: scrollLeft, scrollTop: scrollTop, width: width };
		}

		canvas.addEventListener('mousedown', e => {
			if (this.cursorType == StageEditor.CURSOR_TYPE.NONE) {
				return;
			}
			let pos = calcPos(e);

			if (this.cursorType == StageEditor.CURSOR_TYPE.REMOVE) {
				stage.removeScenario();
			} else {
				stage.addScenario(pos, this.scenario);
			}
			if (this.cursorType == StageEditor.CURSOR_TYPE.EVENT) {
				this.cursorType = StageEditor.CURSOR_TYPE.NONE;
				return;
			}
		});
		canvas.addEventListener('mousemove', e => {
			let pos = calcPos(e);
			// console.log('scrollLeft:' + this.view.scrollLeft + '/scrollTop:' + this.view.scrollTop);
			// console.log('clientX:' + e.clientX + '/clientY:' + e.clientY);
			// console.log('x:' + pos.x + '/y:' + pos.y);
			stage.cursorType = this.cursorType;
			stage.setCursorPos(pos);
		});
		canvas.addEventListener('mouseout', e => stage.cursorType = StageEditor.CURSOR_TYPE.NONE);
	}

	saveMap() {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
		this.product.stage.save().then(data => {
			$.mobile.loading('hide');
			if (data.ok) {
				content.textContent = 'Stage saved.';
			} else {
				content.textContent = 'Save failed.';
			}
			$(messagePopup).popup('open', {});
		});
	}

	saveDetailMap() {
		let formData = new FormData();
		let landform = this.field.landform;
		let prefix = 'scenarioList[';
		let ix = 0;

		formData.append('id', this.stageId);
		formData.append('map.id', this.stage.map.id);
		landform.scenarioList.forEach(scenario => {
			Object.keys(scenario).forEach(key => {
				formData.append(prefix + ix + '].' + key, scenario[key]);
			});
			ix++;
		});
		return new ProductEntity().saveMap(formData);
	}
}

class AttrPanel {
	constructor(stageEditor) {
		this.stageEditor = stageEditor;
		this.panel = document.getElementById('attrPanel');
		this.init();
		this.setupEvent();
	}

	get roll() {
		return parseInt(document.querySelector('[name="roll"]').value);
	}

	init() {
		let mediaset = this.stageEditor.product._mediaset;
		let stage = this.stageEditor.product.stage;
		let startAudio = document.querySelector('[name="startAudio"]');
		let startAudioData = mediaset.getAudio(stage.startAudioSeq);
		let sequelAudio = document.querySelector('[name="sequelAudio"]');
		let sequelAudioData = mediaset.getAudio(stage.sequelAudioSeq);

		//console.log(startAudioData);
		startAudio.setAttribute('data-seq', stage.startAudioSeq);
		startAudio.textContent = startAudioData ? startAudioData.name : null;
		sequelAudio.setAttribute('data-seq', stage.sequelAudioSeq);
		sequelAudio.textContent = sequelAudioData ? sequelAudioData.name : null;
	}

	setupEvent() {
		let stage = this.stageEditor.product.stage;
		let roll = document.querySelector('[name="roll"]');
		let repeat = document.querySelector('[name="repeat"]');
		let posV = document.querySelector('[name="posV"]');
		let startTransition = document.querySelector('[name="startTransition"]');
		let startSpeed = document.querySelector('[name="startSpeed"]');
		let startAudio = document.querySelector('[name="startAudio"]');
		let sequelTransition = document.querySelector('[name="sequelTransition"]');
		let sequelSpeed = document.querySelector('[name="sequelSpeed"]');
		let sequelAudio = document.querySelector('[name="sequelAudio"]');

		roll.addEventListener('change', ()=> {
			// console.log('roll:' + this.roll);
			stage.changeRoll(this.roll);
			this.stageEditor.resetCanvas();
		});
		repeat.addEventListener('change', ()=> {
			let repeatValue = parseInt(repeat.value);

			if (!repeatValue) {
				repeat.value = 1;
			}
			let width = stage.width * repeat.value;

			if (16384 < width) {
				let v = parseInt(16384 / stage.width);
				console.log('v:' + v);
				repeat.value = v;
			}
			this.stageEditor.resetCanvas();
		});
		$(posV).change(()=> {
			stage.posV = posV.value;
			this.stageEditor.resetCanvas();
		});
		startTransition.addEventListener('change', ()=> stage.startTransition = startTransition.value);
		$(startSpeed).change(()=> stage.startSpeed = startSpeed.value);
		sequelTransition.addEventListener('change', ()=> stage.sequelTransition = sequelTransition.value);
		$(sequelSpeed).change(()=> stage.sequelSpeed = sequelSpeed.value);
		$(this.panel).panel({
			close: ()=> {
				stage.startAudioSeq = startAudio.getAttribute('data-seq');
				stage.sequelAudioSeq = sequelAudio.getAttribute('data-seq');
			}
		});
	}
}

class ActorPanel {
	constructor(stageEditor) {
		this.stageEditor = stageEditor;
		this.panel = document.getElementById('actorPanel');
		this.actorType = this.panel.querySelector('[name=actorType]');
		this.setupEvent();
	}

	loadActors() {
		let listView = this.panel.querySelector('[data-role=listview]');
		let data = { criteria: { product: { id: this.stageEditor.product.id }, type: this.actorType.value } };

		listView.textContent = null;
		new ActorEntity().list(data).then(doc => {
			doc.querySelectorAll('li').forEach(li => {
				li.querySelector('a').addEventListener('click', () => {
					this.createScenario(li);
					$(this.panel).panel('close');
				});
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}

	setupEvent() {
		this.actorType.addEventListener('change', () => this.loadActors());
		$(this.actorType).val([3]).selectmenu('refresh')
		this.loadActors();
		$(this.panel).panel({
			close: ()=> {
				this.stageEditor.scenario = this.scenario;
			}
		});
	}

	createScenario(li) {
		let op = this.panel.querySelector('[name=actor_op]:checked').value;
		let seq = li.getAttribute('data-seq');
		let stage = this.stageEditor.product.stage;

		// console.log('seq:' + seq);
		this.scenario = Scenario.create({op: op, target: 'E', type: 0, number: seq}, stage);
		this.stageEditor.cursorType = StageEditor.CURSOR_TYPE.ACTOR;
	}

	open() {
		$(this.panel).panel('open');
	}
}

class EventPanel {
	constructor(stageEditor) {
		this.stageEditor = stageEditor;
		this.panel = document.getElementById('eventPanel');
		this.setupEvent();
	}

	get scenario() {
		let chk = this.panel.querySelector('[name=op]:checked');
		let op = chk.value;
		let cursorType = chk.getAttribute('data-type');
		let type = 0;
		let number = 0;
		let stage = this.stageEditor.product.stage;

		if (op == 'Apl') {
			let audioSelector = document.querySelector('#audioSelectorButton .audioSelector');

			type = audioSelector.getAttribute('data-type');
			number = audioSelector.getAttribute('data-seq');
			console.log('type:' + type + '/number:' + number);
		}
		return Scenario.create({op: op, target: cursorType.charAt(0), type: type, number: number}, stage);
	}

	setupEvent() {
		let op = $('[name="op"]');
		let audioSelectorButton = document.getElementById('audioSelectorButton');
		let firstOp = this.panel.querySelector('[name=op]');

		op.click(()=> {
			let chk = this.panel.querySelector('[name=op]:checked');

			if (chk.value.toLowerCase() == 'apl') {
				// Play BGM
				$(audioSelectorButton).show();
			} else {
				$(audioSelectorButton).hide();
				// $(this.panel).panel('close');
			}
			this.stageEditor.cursorType = StageEditor.CURSOR_TYPE.EVENT;
		});
		$(firstOp).prop('checked', true).checkboxradio('refresh');
		$(audioSelectorButton).hide();
		$(this.panel).panel({
			close: ()=> {
				this.stageEditor.scenario = this.scenario;
			}
		});
	}

	open() {
		$(this.panel).panel('open');
	}
}

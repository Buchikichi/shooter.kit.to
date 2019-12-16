document.addEventListener('DOMContentLoaded', ()=> {
	new EditStage();
});

class EditStage {
	/**
	 * インスタンス生成.
	 */
	constructor() {
		this.detailId = document.getElementById('detailId').value;
		this.frame = document.getElementById('frame');
		this.canvas = document.getElementById('canvas');
		this.loadDetail();
	}

	get isMove() {
		return $('[name="behavior"]:checked').val() == 'm';
	}

	get gide() {
		return document.querySelector('[name="guide"]:checked').value;
	}

	get brickColor() {
		return document.querySelector('[name="color"]:checked').value;
	}

	get scale() {
		return document.querySelector('[name="scale"]:checked').value;
	}

	get roll() {
		return parseInt(document.querySelector('[name="roll"]').value);
	}

	get repeat() {
		return document.querySelector('[name="repeat"]').value;
	}

	loadDetail() {
		let productId = document.getElementById('productId').value;
		let loading = document.getElementById('loading');

		Product.create(productId).then(product => {
			let detail = null;

//			this.view = new FlexibleView(512, 224);
//			this.field = new FieldEditor(this.view, detail);
			product.selectStage(this.detailId);
//			this.setupStage(detail);
			return Mediaset.Instance.checkLoading((loaded, max) => {
				let msg = loaded + '/' + max;

				loading.innerHTML = msg;
			});
		}).then(()=> {
			loading.parentNode.removeChild(loading);
			this.resetCanvas();
			this.start();
		});
	}

	resetCanvas() {
		let product = Product.Instance;
		let stage = product.stage;
		let scale = this.scale;
		let hasMargin = this.roll == Stage.SCROLL.OFF || this.roll == Stage.SCROLL.ON;
		let width = stage.width * this.repeat;
		let height = stage.height + (hasMargin ? product.height * 2 : 0);
		let frameWidth = width * scale;
		let frameHeight = height * scale;
		let originTop = hasMargin ? product.height : 0;

		this.frame.style.width = frameWidth + 'px';
		this.frame.style.height = frameHeight + 'px';
		this.canvas.style.transformOrigin = originTop + 'px ' + '0px';
		this.canvas.style.transform = 'scale(' + scale + ', ' + scale + ')';
		this.canvas.width = width;
		this.canvas.height = height;
		console.log('stage width:' + this.canvas.width + '/height:' + this.canvas.height);
		this.ctx = this.canvas.getContext('2d');
	}

	changeColor() {
		console.log('changeColor:' + this.brickColor);
		Product.Instance.stage.map.brickColor = this.brickColor;
	}

	setupStage(detail) {
		let form = document.getElementById('inputBox');
		let propList = {
			'speed':{min:0, max:1, step:0.1},
			'dir':{min:0, max:1, step:0.01},
			'blink':{min:0, max:1, step:0.01},
		}

		this.stage = Stage.create(detail);
		Stage.VIEWS.forEach(key => {
			let imageId = detail[key];

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
				let value = detail[name].toFixed(2);

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

	start() {
		let product = Product.Instance;
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
			product.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

//console.log('start!:' + landform.stage.fg.width);
//		this.controller = new Controller();
//		this.actorPanel = new ActorPanel(this.field);
//		this.actorPanel.setupActors(Product.Instance.actorList);
		this.setupActors(Product.Instance.actorList);
		$('[name="behavior"]:eq(2)').checkboxradio('enable').checkboxradio("refresh");
//		landform.isEdit = true;
//		landform.loadStage(this.stage);
		this.setupEvents();
		activate();
	}

	setupActors(actorList) {
console.log('#setupActors:' + actorList);
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
		let stage = Product.Instance.stage;

		stage.setProgress(0);

		$('[name="scale"]').click(()=> this.resetCanvas());
		$('[name="color"]').click(()=> this.changeColor());
		// Actor
//		$('[name="behavior"]:eq(1)').click(()=> this.actorPanel.open());
		// saveButton
		document.getElementById('saveButton').addEventListener('click', ()=> this.saveMap());
		//
		this.changeColor();
		this.setupAttributes();
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
			landform.stage.setProgress(h);
		}
		if (dy != 0) {
			landform.wheel(dy);
		}
		this.controller.decPoint(dx * Landform.BRICK_WIDTH, dy * Landform.BRICK_WIDTH);
	}

	setupAttributes() {
		let stage = Product.Instance.stage;
		let roll = document.querySelector('[name="roll"]');
		let repeat = document.querySelector('[name="repeat"]');
		let vPos = document.querySelector('[name="vPos"]');
		let startEffect = document.querySelector('[name="startEffect"]');
		let startSpeed = document.querySelector('[name="startSpeed"]');
		let sequelEffect = document.querySelector('[name="sequelEffect"]');
		let sequelSpeed = document.querySelector('[name="sequelSpeed"]');

		roll.addEventListener('change', ()=> {
			console.log('roll:' + this.roll);
			stage.changeRoll(this.roll);
			this.resetCanvas();
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
			this.resetCanvas();
		});
		$(vPos).change(()=> {
			console.log('vPos:' + vPos.value);
			stage.vPos = vPos.value;
			this.resetCanvas();
		});
		startEffect.addEventListener('change', ()=> stage.startEffect = startEffect.value);
		$(startSpeed).change(()=> {
			console.log('startSpeed:' + startSpeed.value);
			stage.startSpeed = startSpeed.value;
		});
		sequelEffect.addEventListener('change', ()=> stage.sequelEffect = sequelEffect.value);
		$(sequelSpeed).change(()=> {
			console.log('startSpeed:' + sequelSpeed.value);
			stage.sequelSpeed = sequelSpeed.value;
		});
	}

	setupPointingDevice() {
		let canvas = document.getElementById('canvas');

		canvas.addEventListener('mousemove', event => {
		});
	}

	saveMap() {
//		let save = this.saveDetailMap();
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', {text: 'Save...', textVisible: true});
//		save.then(data => {
		new ProductEntity().then(data => {
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

		formData.append('id', this.detailId);
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
				img.setAttribute('src', '/visual/src/' + actor.imageid);
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

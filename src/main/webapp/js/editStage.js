document.addEventListener('DOMContentLoaded', () => new EditStage());

class EditStage {
	constructor() {
		this.stageId = document.getElementById('stageId').value;
		this.view = document.getElementById('view');
		this.frame = document.getElementById('frame');
		this.canvas = document.getElementById('canvas');
		this.header = document.querySelector('[data-role=header]');
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

		ProductEditor.create(productId, callback).then(product => {
			this.product = product;
			product.selectStage(this.stageId);
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
		this.initView();
	}

	initView() {
		let remainH = this.view.scrollHeight - this.view.clientHeight;

		this.view.scrollTop = remainH / 2;
	}

	start() {
		let activate = () => {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

			this.ctx.save();
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.product.draw(this.ctx);
			this.ctx.restore();
			requestAnimationFrame(activate);
		};

		console.log('EditStage#start');
		activate();
	}

	setupEvents() {
		// console.log('EditStage#setupEvents');
		let stage = this.product.stage;
		let changeGuide = () => {
			stage.hasGuide = document.querySelector('[name="guide"]:checked').value == '1';
		};
		let changeColor = () => {
			stage.map.brickColor = document.querySelector('[name="color"]:checked').value;
		};
		let resize = () => {
			let height = window.innerHeight - this.header.clientHeight - 8;
			// console.log('resize:' + window.innerHeight);
			// console.log('header:' + this.header.clientHeight);
			this.view.style.height = height + 'px';
		};

		this.attrPanel = new AttrPanel(this);
		this.eventPanel = new EventPanel(this);
		this.editEventPanel = new EditEventPanel(this);
		stage.setProgress(0);

		$('[name="behavior"]:eq(0)').click(() => this.eventPanel.open());
		$('[name="behavior"]:eq(1)').click(() => stage.cursorType = StageEditor.CURSOR_TYPE.EDIT);
		$('[name="behavior"]:eq(2)').click(() => stage.cursorType = StageEditor.CURSOR_TYPE.REMOVE);
		// $('[name="behavior"]:eq(2)').checkboxradio('enable').checkboxradio("refresh");
		$('[name="guide"]').click(() => changeGuide());
		$('[name="scale"]').click(() => this.resetCanvas());
		$('[name="color"]').click(() => changeColor());
		document.getElementById('saveButton').addEventListener('click', () => this.saveMap());
		window.addEventListener('resize', resize);
		//
		changeGuide();
		changeColor();
		resize();
		this.setupPointingDevice();
		new ActorSelector();
		new AudioSelector();
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
			let y = (scrollTop + e.clientY - this.header.clientHeight) / this.scale
				- (this.hasMargin ? product.height : 0);

			return { x: x, y: y, scrollLeft: scrollLeft, scrollTop: scrollTop, width: width };
		}

		canvas.addEventListener('mousedown', e => stage.onMousedown(calcPos(e), this.scenario));
		canvas.addEventListener('mousemove', e => stage.onMousemove(calcPos(e), this.scenario));
		canvas.addEventListener('mouseup', () => {
			if (stage.cursorType == StageEditor.CURSOR_TYPE.EDIT && stage._currentScenario) {
				this.editEventPanel.open(stage._currentScenario);
				stage._currentScenario = null;
			}
		});
		canvas.addEventListener('mouseout', e => stage.onMousemove());
	}

	saveMap() {
		let messagePopup = document.getElementById('messagePopup');
		let content = messagePopup.querySelector('p');

		$.mobile.loading('show', { text: 'Save...', textVisible: true });
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
}

class AttrPanel extends PanelBase {
	constructor(stageEditor) {
		super('attrPanel', stageEditor.product.stage);
		this.stageEditor = stageEditor;
		this.init();
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
		startAudio.textContent = startAudioData ? startAudioData.name : null;
		sequelAudio.textContent = sequelAudioData ? sequelAudioData.name : null;
	}

	setupEvents() {
		super.setupEvents();
		let stage = this.target;
		let roll = document.querySelector('[name="roll"]');
		let repeat = document.querySelector('[name="repeat"]');
		let posV = document.querySelector('[name="posV"]');
		let startAudio = document.querySelector('[name="startAudio"]');
		let sequelAudio = document.querySelector('[name="sequelAudio"]');

		roll.addEventListener('change', () => {
			// console.log('roll:' + this.roll);
			stage.changeRoll(this.roll);
			this.stageEditor.resetCanvas();
		});
		repeat.addEventListener('change', () => {
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
		$(posV).change(() => {
			stage.posV = posV.value;
			this.stageEditor.resetCanvas();
		});
		$(this.panel).panel({
			close: () => {
				stage.startAudioSeq = startAudio.value;
				stage.sequelAudioSeq = sequelAudio.value;
			}
		});
	}
}

class EventPanel {
	constructor(stageEditor) {
		this.stageEditor = stageEditor;
		this.panel = document.getElementById('eventPanel');
		this.actorType = this.panel.querySelector('[name=actorType]');
		this.setupEvent();
	}

	createEffectScenario() {
		let chk = this.panel.querySelector('[name=op]:checked');
		let op = chk.value;
		let number = '0';
		let stage = this.stageEditor.product.stage;

		if (op == 'Apl') {
			let audioSelector = document.querySelector('#audioSelectorButton .audioSelector');

			number = audioSelector.value;
		}
		this.scenario = Scenario.create({ op: op, number: number }, stage);
		stage.cursorType = StageEditor.CURSOR_TYPE.EVENT;
		console.log('createEffectScenario');
	}

	createActorScenario(li) {
		let op = this.panel.querySelector('[name=actor_op]:checked').value;
		let seq = li.getAttribute('data-seq');
		let stage = this.stageEditor.product.stage;

		// console.log('seq:' + seq);
		this.scenario = Scenario.create({ op: op, number: seq }, stage);
		stage.cursorType = StageEditor.CURSOR_TYPE.ACTOR;
	}

	loadActors() {
		let listView = this.panel.querySelector('[data-role=listview]');
		let mediasetId = this.stageEditor.product._mediaset.id;
		let data = { criteria: { mediaset: { id: mediasetId }, type: this.actorType.value } };

		listView.textContent = null;
		new ActorEntity().list(data).then(doc => {
			doc.querySelectorAll('li').forEach(li => {
				let anchor = li.querySelector('a');

				anchor.addEventListener('click', () => {
					this.createActorScenario(li);
					$(this.panel).panel('close');
				});
				anchor.removeAttribute('href');
				listView.appendChild(li)
			});
			$(listView).listview('refresh');
		});
	}

	setupEvent() {
		let audioSelectorButton = document.getElementById('audioSelectorButton');

		this.panel.querySelectorAll('[name="op"]').forEach(op => {
			op.addEventListener('click', () => {
				let chk = this.panel.querySelector('[name=op]:checked');

				if (chk.value.toLowerCase() == 'apl') {
					// Play BGM
					$(audioSelectorButton).show();
				} else {
					$(audioSelectorButton).hide();
					// $(this.panel).panel('close');
				}
				this.createEffectScenario();
			});
			op.parentNode.addEventListener('click', () => op.click());
		});
		// $(firstOp).prop('checked', true).checkboxradio('refresh');
		$(audioSelectorButton).hide();
		this.actorType.addEventListener('change', () => this.loadActors());
		$(this.actorType).val([3]).selectmenu('refresh')
		this.loadActors();
		$(this.panel).panel({
			close: () => {
				this.stageEditor.scenario = this.scenario;
			}
		});
	}

	open() {
		$(this.panel).panel('open');
	}
}

class EditEventPanel extends PanelBase {
	constructor(stageEditor) {
		super('editEventPanel');
		this.stageEditor = stageEditor;
	}

	setupEvents() {
		this.belongings = this.panel.querySelector('[name=belongings]');
		super.setupEvents();
	}

	resetInputs(target) {
		// console.log('EditEventPanel#resetInputs');
		// console.log(target);
		super.resetInputs(target);
		let actor = this.stageEditor.product._mediaset._actorMap[target.belongings];
		let name = actor ? actor.className : null;

		this.belongings.textContent = name;
	}

	onClose() {
		this.stageEditor.product.stage.onMousemove();
		this.target.belongings = this.belongings.value;
	}
}

/**
 * Shooterメイン処理.
 */
document.addEventListener('DOMContentLoaded', ()=> {
	new ShooterMain();
});

class ShooterMain {
	constructor() {
		this.loadProduct();
	}

	get productId() {
		return document.getElementById('productId').value;
	}

	loadProduct() {
		this.productController = new ProductEntity();
		this.productController.select(this.productId).then(product => {
			Mediaset.create(product.mediaset).load();
			this.setupField(product);
			this.setupStage(product);
			this.setupActors(product);
			this.checkLoading();
		});
	}

	setupField(product) {
		this.field = new Field(product.width, product.height);
		if (0 < product.scoreList.length) {
			this.field.hiscore = product.scoreList[0].score;
		}
	}

	setupStage(product) {
		let type = product.name.substr(-1);
		let stageList = [];

		product.detailList.forEach(detail => {
			let entity = detail.map;
			let view = Stage.createViewList(entity);
			let map = detail.mapData ? detail.mapData : entity.map;
			let stage = new Stage(detail.roll, map, view).setBgm(entity.theme, entity.boss);

stage.scenarioList = detail.scenarioList;
//console.log(stage);
			stageList.push(stage);
		});
		Stage.LIST = stageList;
	}

	setupActors(product) {
		let actorList = product.actorList;

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

			Enemy.LIST[ix] = {name:actor.name, type:type, h:16, formation:formation};
		});
	}

	checkLoading() {
		let loading = document.getElementById('loading');
		let repositories = [VisualManager.Instance, AudioMixer.INSTANCE];
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

	increase() {
		this.productController.increase(this.productId).then(rec => {
			console.log('increase:' + rec.ok);
		});
	}

	registerScore() {
		let scoreController = new ScoreEntity();
		let formData = new FormData();

		formData.append('productId', this.productId);
		formData.append('score', this.field.score);
		formData.append('name', '');
		scoreController.register(formData).then(rec => {
			console.log('registerScore:' + rec.ok);
		});
	}

	start() {
		let controller = new Controller();
		let gameOverPanel = document.getElementById('gameOver');
		let startGame = ()=> {
			this.increase();
			this.field.startGame();
			gameOverPanel.classList.add('hidden');
		};
		let endGame = ()=> {
			if (gameOverPanel.classList.contains('hidden')) {
				gameOverPanel.classList.remove('hidden');
				this.registerScore();
			}
		}
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

			this.field.move();
			this.field.draw();
			if (this.field.isGameOver) {
				endGame();
			}
			requestAnimationFrame(activate);
		};

		gameOverPanel.addEventListener('mousedown', event => {
			startGame();
		});
		window.addEventListener('keydown', event => {
			let isGameOver = !gameOverPanel.classList.contains('hidden');
			let keys = controller.keys;

			if (isGameOver && (keys[' '] || keys['k32']|| keys['Enter'])) {
				startGame();
			}
		});
		activate();
	}
}

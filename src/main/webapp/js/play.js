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

	loadProduct() {
		let productId = document.getElementById('productId').value;
		let productController = new ProductEntity();

		productController.select(productId).then(product => {
			this.field = new Field(product.width, product.height);
			this.setupStage(product);
			this.setupActors(product);
			this.checkLoading();
		});
	}

	setupStage(product) {
		let type = product.name.substr(-1);
		let stageList = [];

		product.detailList.forEach(detail => {
			let entity = detail.stage;
			let view = Stage.createViewList(entity);
			let mapURL = entity.map;
			let stage = new Stage(detail.roll, entity.map, view).setBgm(entity.theme, entity.boss);

//console.log(stage);
			stageList.push(stage);
		});
		Stage.LIST = stageList;
	}

	setupActors(product) {
		Enemy.LIST = [
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
		let controller = new Controller();
		let activate = ()=> {
			let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

			this.field.move();
			this.field.draw();
			requestAnimationFrame(activate);
		};
		let gameOverPanel = document.getElementById('gameOver');
		let startGame = ()=> {
			this.field.startGame();
			gameOverPanel.classList.add('hidden');
		};

		gameOverPanel.addEventListener('mousedown', event => {
			startGame();
		});
		window.addEventListener('keydown', event => {
			let isGameOver = !gameOverPanel.classList.contains('hidden');
			let keys = controller.keys;

			if (isGameOver && (keys[' '] || keys['k32'])) {
				startGame();
			}
		});
		activate();
	}
}

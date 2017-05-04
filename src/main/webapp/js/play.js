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
		let product = new ProductEntity();

		product.select(productId).then(rec => {
			this.field = new Field(rec.width, rec.height);
			this.setupStage(rec);
			this.setupActors(rec);
			this.checkLoading();
		});
	}

	createViewList(stage) {
		let list = [];
let speedList = [.3, .4, .2, .5, .5, .5];
let blinkList = [0, .2, 0, 0, 0, 0];

		['bg1', 'bg2', 'bg3', 'fg1', 'fg2', 'fg3'].forEach((key, ix) => {
			let imageId = stage[key];

			if (!imageId || imageId.length == 0) {
				return;
			}
			let speed = speedList[ix]; // TODO 仮のため、正しく設定する
			let dir = 0; // TODO 仮のため、正しく設定する
			let blink = blinkList[ix]; // TODO 仮のため、正しく設定する
			// (img, speed = .5, dir = 0, blink = 0)
			if (key.startsWith('b')) {
				list.push(new StageBg(imageId, speed, dir, blink));
			} else {
				list.push(new StageFg(imageId, speed, dir, blink));
			}
		});
		return list;
	}

	setupStage(rec) {
		Stage.LIST = [
/*			new Stage(Stage.SCROLL.ON, 'stage00map.png', [
					new StageBg('stage01bg0.png', .3), new StageBg('stage01bg1.png', .4, 0, .02), new StageFg('stage00bg.png'),
				]).setBgm('bgm-edo-beth'),
			new Stage(Stage.SCROLL.ON, 'stage01map.png', [
					new StageBg('stage01bg1.png', .3, 0, .02), new StageBg('stage01bg0.png', .3), new StageFg('stage01bg.png', .6),
				]).setBgm('bgm-MadNightDance', 'bgm-edo-omega-zero'),
			new Stage(Stage.SCROLL.LOOP, 'stage00map.png', [
					new StageBg('stage01bg0.png', .3), new StageBg('stage01bg1.png', .4, 0, .02), new StageFg('stage00bg.png'),
				]).setBgm('bgm-edo-beth'),
			new Stage(Stage.SCROLL.ON, 'stage02map.png', [
					new StageBg('stage01bg1.png', .3), new StageBg('stage01bg0.png', .4), new StageFg('stage02bg.png'),
				]).setBgm('bgm-pierrot-cards', 'bgm-edo-omega-zero'),
//*/

//			new Stage(Stage.SCROLL.OFF, 'stage-map.png', [
//				new StageBg('stage01bg1.png', .3), new StageBg('stage01bg0.png', .4), new StageFg('stage-bg.png'),
//			]).setBgm('bgm-edo-beth', 'bgm-edo-omega-zero'),
/*			new Stage(Stage.SCROLL.ON, 'stage1.map.png', [
					new StageBg('stage01bg1.png', .3), new StageBg('stage01bg0.png', .4), new StageFg('stage1.1.0.png', .6),
				]).setBgm('bgm-ThroughTheDark', 'bgm-edo-omega-zero'),
			new Stage(Stage.SCROLL.ON, 'stage2.map.png', [
					new StageBg('stage2.1.1.png', .3), new StageBg('stage01bg1.png', 1, -Math.SQ / 2), new StageFg('stage2.1.0.png'),
				]).setBgm('bgm-pierrot-cards', 'bgm-edo-omega-zero'),
			new Stage(Stage.SCROLL.ON, 'stage3.map.png', [
					new StageBg('stage01bg1.png', .3), new StageFg('stage3.1.1.png', .5, 0, .02), new StageFg('stage3.1.0.png'),
				]).setBgm('bgm-YourDream-R', 'bgm-edo-omega-zero'),
			new Stage(Stage.SCROLL.LOOP, 'stage4.map.png', [
					new StageBg('stage01bg1.png', .3), new StageFg('stage01bg0.png', .5, 0, .02), new StageFg('stage4.1.0.png', .3),
				]).setBgm('bgm-MadNightDance', 'bgm-edo-omega-zero'),
//*/
		];
		let testMap = {
			A:['stage00map.png', 'stage01map.png', 'stage00map.png', 'stage02map.png'],
			B:['stage1.map.png', 'stage2.map.png', 'stage3.map.png', 'stage4.map.png'],
			C:['stage-map.png'],
		};
		let type = rec.name.substr(-1);
		let map = testMap[type];
		let stageList = [];

		rec.detailList.forEach((detail, ix) => {
			let view = this.createViewList(detail.stage);
			let stage = new Stage(detail.roll, map[ix], view).setBgm(detail.stage.theme, detail.stage.boss);

//console.log(stage);
			stageList.push(stage);
		});
		Stage.LIST = stageList;
	}

	setupActors(rec) {
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

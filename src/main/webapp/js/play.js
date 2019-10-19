/**
 * Shooterメイン処理.
 */
document.addEventListener('DOMContentLoaded', ()=> {
	new ShooterMain();
});

class ShooterMain {
	constructor() {
		let productId = document.getElementById('productId').value;
		let loading = document.getElementById('loading');

		Product.create(productId).then(product => {
			this.view = new FlexibleView(product.width, product.height);
			this.field = new Field(this.view);
			this.setupActors(product);
			return Mediaset.Instance.checkLoading((loaded, max) => {
				let msg = loaded + '/' + max;

				loading.innerHTML = msg;
			});
		}).then(()=> {
			loading.parentNode.removeChild(loading);
			this.start();
		});
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

	start() {
		let product = Product.Instance;
		let controller = new Controller();
		let gameOverPanel = document.getElementById('gameOver');
		let startGame = ()=> {
			product.startGame();
			gameOverPanel.classList.add('hidden');
		};
		let endGame = ()=> {
			if (gameOverPanel.classList.contains('hidden')) {
				gameOverPanel.classList.remove('hidden');
				product.registerScore();
			}
		}
		let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
		let activate = ()=> {
			this.view.clear();
			this.field.move();
			this.field.draw(this.view.ctx);
			this.showScore(product);
			if (product.isGameOver) {
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

	showScore(product) {
		if (product.hiscore < product.score) {
			product.hiscore = product.score;
		}
		let scoreNode = document.querySelector('#score > div > div:nth-child(2)');
		let hiscoreNode = document.querySelector('#score > div:nth-child(2) > div:nth-child(2)');
		let debugNode = document.querySelector('#score > div:nth-child(3)');
		let remainNode = document.querySelector('#remain > div > div:nth-child(1)');

		if (!scoreNode) {
			return;
		}
		scoreNode.innerHTML = product.score;
		hiscoreNode.innerHTML = product.hiscore;
//		debugNode.innerHTML = this.actorList.length + ':' + parseInt(product.loosingRate);
		if (product.shipRemain) {
			remainNode.style.width = (product.shipRemain - 1) * 16 + 'px';
		}
	}
}

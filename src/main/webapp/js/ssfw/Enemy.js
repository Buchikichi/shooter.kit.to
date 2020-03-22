/**
 * Enemy.
 */
class Enemy extends Actor {
	constructor(x, y, z = 0) {
		super(x, y, z);
		this.radian = Math.PI;
		this.routine = null;
		this.routineIx = 0;
		this.routineCnt = 0;
		this.chamberList = [new Chamber(Bullet, Enemy.TRIGGER_CYCLE)];
	}

	checkInverse() {
		if (!this._stage || !this._stage.map) {
			return;
		}
		let map = this._stage.map;
		let margin = this.hH + map.brickSize / 2;
		let srcTop = Object.assign({}, this, { y: this.y - margin });
		let srcBottom = Object.assign({}, this, { y: this.y + margin });

		this.isInverse = map.bricks.isHit(srcTop) && !map.bricks.isHit(srcBottom);
	}

	move(target) {
		if (this.routine) {
			let mov = this.routine[this.routineIx];

			mov.tick(this, target);
		}
		let result = super.move(target);
//console.log('enemy[' + this.x + ',' + this.y + ']');
		if (!(target instanceof Enemy) && this.calcDistance(target) < Enemy.TRIGGER_ALLOWANCE) {
			result = [];
		}
		return result;
	}

	static getActor(number) {
		let actor = Enemy.LIST[number % Enemy.LIST.length];

		return actor;
	}

	static assign(ix, x, y) {
//console.log('Enemy.assign:' + ix + '/' + Enemy.LIST.length);
		let instance = Enemy.LIST[ix % Enemy.LIST.length];
		if (!instance) {
			return null;
		}
		let enemy = Object.assign({}, instance);

		enemy.x = x;
		enemy.y = y;
		return enemy;
	}

	static create(rec, params = {}) {
		return Object.assign(new Enemy(), rec, params).init();
	}
}
Enemy.TRIGGER_CYCLE = 50;
Enemy.TRIGGER_ALLOWANCE = 100;
Enemy.MAX_TYPE = 0x7f;
Enemy.LIST = [];

/**
 * Chain.
 */
class Chain extends Enemy {
	constructor(x, y) {
		super(x, y);
		this.prev = null;
		this.next = null;
	}

	eject() {
		console.log('Chain#eject:' + this.constructor.name);
		super.eject();
		if (this.next) {
			this.next.eject();
		}
	}

	unshift(element) {
		element.next = this;
		element.prev = this.prev;
		if (this.prev) {
			this.prev.next = element;
		}
		this.prev = element;
		return this;
	}

	push(element) {
		element.prev = this;
		element.next = this.next;
		if (this.next) {
			this.next.prev = element;
		}
		this.next = element;
		return this;
	}

	remove() {
		this.prev.next = this.next;
		this.next.prev = this.prev;
		return this.next;
	}
}

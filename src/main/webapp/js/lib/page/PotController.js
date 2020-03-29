class PotController {
	constructor(potController) {
		this.init(potController);
	}

	init(potController) {
		let node = potController.parentNode;
		let collapsed = null;

		while (node) {
			if (node.classList.contains('ui-collapsible-content-collapsed')) {
				node.classList.remove('ui-collapsible-content-collapsed');
				collapsed = node;
				break;
			}
			node = node.parentNode;
		}
		this.setupEvents(potController);
		if (collapsed) {
			collapsed.classList.add('ui-collapsible-content-collapsed');
		}
	}

	setupEvents(potController) {
		let number = potController.parentNode.querySelector('[type=number]');
		let oval = potController.querySelector('.oval');

		new PotKnob(number, oval.querySelector('.knob'), oval.querySelector('.hand'));
	}

	static create() {
		document.querySelectorAll('.potController').forEach(p => new PotController(p));
	}
}

class PotKnob {
	constructor(number, knob, hand) {
		let oval = knob.parentNode;
		let ovalRect = oval.getBoundingClientRect();
		let knobRect = knob.getBoundingClientRect();

		this.number = number;
		this.oval = oval;
		this.hand = hand;
		this.knob = knob;
		this.radius = ovalRect.width / 2;
		this.knobRadius = knobRect.width / 2;
		this.setupEvents();
		this.setDegree(number.value, true);
	}

	setupEvents() {
		this.number.addEventListener('change', () => {
			this.setDegree(this.number.value, true);
		});
		$(this.knob).draggable({
			drag: () => {
				let ovalRect = this.oval.getBoundingClientRect();
				let knobRect = this.knob.getBoundingClientRect();
				let dx = knobRect.left + this.knobRadius - (ovalRect.left + this.radius);
				let dy = knobRect.top + this.knobRadius - (ovalRect.top + this.radius);
				let deg = Math.atan2(dy, dx) / Math.PI * 180;

				this.setDegree(deg);
				this.number.value = this.degree;
			},
			stop: () => this.resetKnob()
		});
	}

	resetKnob() {
		let radian = this.degree / 180 * Math.PI;
		let x = Math.cos(radian) * this.radius + this.radius - this.knobRadius;
		let y = Math.sin(radian) * this.radius - this.knobRadius;

		this.knob.style.left = x + 'px';
		this.knob.style.top = y + 'px';
	}

	setDegree(deg, withKnob = false) {
		this.degree = parseInt(deg);
		// console.log('deg:' + this.degree);
		this.hand.style.transform = 'rotate(' + this.degree + 'deg)';
		if (withKnob) {
			this.resetKnob();
		}
	}
}

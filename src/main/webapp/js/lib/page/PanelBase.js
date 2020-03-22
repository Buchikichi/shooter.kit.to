class PanelBase {
	constructor(panelId, target = null) {
		this.panel = document.getElementById(panelId);
		this.inputList = this.panel.querySelectorAll('[type=text], [type=number], select');
		this.target = target;
		this.setupEvents();
	}

	setupEvents() {
		// console.log(this.constructor.name + '#setupEvents');
		// this.inputList.forEach(i => console.log(i.tagName + ':' + i.name));
		this.inputList.forEach(i => i.addEventListener('change', () => {
			let value = i.value;

			if (i.tagName == 'SELECT') {
				let dataValue = i.querySelector('option:checked').getAttribute('data-value');

				if (dataValue) {
					value = dataValue;
				}
			}
			this.target[i.name] = value;
		}));
	}

	resetInputs() {
		this.inputList.forEach(i => {
			i.value = this.target[i.name];
			if (i.tagName == 'SELECT') {
				$(i).selectmenu('refresh', false);
			}
		});
	}
}

class PanelBase {
	constructor(panelId, target = null) {
		this.panel = document.getElementById(panelId);
		this.role = this.panel.getAttribute('data-role');
		this.inputList = this.panel.querySelectorAll('[type=text], [type=number], textarea, select');
		this.target = target;
		this.setupEvents();
	}

	setupEvents() {
		// console.log(this.constructor.name + '#setupEvents');
		// this.inputList.forEach(i => console.log(i.tagName + ':' + i.name));
		this.inputList.forEach(i => {
			let tagName = i.tagName.toUpperCase();
			let changeValue = () => {
				if (!this.target) {
					return;
				}
				let value = i.value;

				if (tagName == 'SELECT') {
					let dataValue = i.querySelector('option:checked').getAttribute('data-value');

					if (dataValue) {
						value = dataValue;
					}
				}
				this.target[i.name] = value;
			};

			i.addEventListener('change', () => changeValue())
			if (tagName == 'INPUT' && i.type == 'number') {
				let dataType = i.getAttribute('data-type');

				if (dataType == 'range') {
					$(i).change(() => changeValue());
				}
			}
		});
		if (this.role == 'panel') {
			$(this.panel).panel({
				open:  () => this.onOpen(),
				close: () => this.onClose()
			});
		}
		if (this.role == 'popup') {
			$(this.panel).popup({
				afterclose: () => this.onClose()
			});
		}
	}

	resetInputs(target = null) {
		if (target) {
			this.target = target;
		}
		this.inputList.forEach(i => {
			i.value = this.target[i.name];
			if (i.tagName == 'SELECT') {
				$(i).selectmenu('refresh', false);
			}
			i.dispatchEvent(new Event('change'));
		});
	}

	open(target = null) {
		this.resetInputs(target);
		if (this.role == 'panel') {
			$(this.panel).panel('open');
		}
		if (this.role == 'popup') {
			$(this.panel).popup('open');
		}
	}

	onOpen() { }

	onClose() { }
}

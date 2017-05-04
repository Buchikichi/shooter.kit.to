/**
 * オーディオ選択ボタン.
 */
class AudioSelectionButton {
//	<fieldset>
//	  <legend>Theme:</legend>
//	  <a href="#audioChooser" data-target="theme" data-filter="BGM" data-rel="popup" class="ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio">Choose...</a>
//	  <div data-role="controlgroup" data-type="horizontal" data-mini="true">
//	    <button type="button" data-icon="audio">W</button>
//	    <button type="button" data-icon="audio">A</button>
//	    <button type="button" data-icon="delete" data-theme="b" class="ui-btn-icon-notext">Del</button>
//	  </div>
//	  <input type="hidden" name="theme"/>
//	</fieldset>
	constructor(name, filter = 'OTHER') {
		let legend = document.createElement('legend');
		let anchor = document.createElement('a');
		let hidden = document.createElement('input');
		let controlgroup = document.createElement('div');
		let webmButton = document.createElement('button');
		let audioButton = document.createElement('button');
		let deleteButton = document.createElement('button');
		let fieldset = document.createElement('fieldset');
		let attrName = name.toLowerCase();

		legend.textContent = name + ':';
		anchor.setAttribute('href', '#audioChooser');
		anchor.setAttribute('data-target', attrName);
		anchor.setAttribute('data-filter', filter);
		anchor.setAttribute('data-rel', 'popup');
		anchor.className = 'ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-audio';
		anchor.textContent = 'Choose...';
		hidden.setAttribute('type', 'hidden');
		hidden.setAttribute('name', attrName);
		hidden.addEventListener('valueChanged', ()=> {
//console.log(name + ' changed:' + hidden.value);
			this.resetImage();
		});
		webmButton.textContent = 'W';
		webmButton.setAttribute('data-icon', 'audio');
		webmButton.addEventListener('click', e => {
			e.preventDefault();
			window.open('/audio/webm/?id=' + hidden.value);
		});
		audioButton.textContent = 'A';
		audioButton.setAttribute('data-icon', 'audio');
		audioButton.addEventListener('click', e => {
			e.preventDefault();
			window.open('/audio/audio/?id=' + hidden.value);
		});
		deleteButton.textContent = 'Del';
		deleteButton.setAttribute('data-icon', 'delete');
		deleteButton.setAttribute('data-theme', 'b');
		deleteButton.className = 'ui-btn-icon-notext';
		deleteButton.addEventListener('click', e => {
			e.preventDefault();
			hidden.value = '';
			this.resetImage();
		});
		controlgroup.append(webmButton);
		controlgroup.append(audioButton);
		controlgroup.append(deleteButton);
		fieldset.append(legend);
		fieldset.append(anchor);
		fieldset.append(hidden);
		fieldset.append(controlgroup);
		$(controlgroup).controlgroup({type: 'horizontal', mini: true});
		//
		this.fieldset = fieldset;
		this.button = anchor;
		this.hidden = hidden;
		this.controlgroup = controlgroup;
	}

	resetImage() {
		let id = this.hidden.value;

		if (id) {
			$(this.controlgroup).show();
			$(this.button).hide();
		} else {
			$(this.controlgroup).hide();
			$(this.button).show();
		}
	}
}

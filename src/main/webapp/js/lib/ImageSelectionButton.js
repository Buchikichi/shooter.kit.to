/**
 * イメージ選択ボタン.
 */
class ImageSelectionButton {
	//	<fieldset>
	//	  <legend>BG1:</legend>
	//	  <a href="#imageChooser" data-target="bg1" data-filter="back" data-rel="popup" class="ui-btn ui-corner-all ui-shadow ui-icon-heart ui-btn-icon-left ui-btn-a">Choose...</a>
	//	  <input type="hidden" name="bg1"/>
	//	  <img id="bg1.thumbnail"/>
	//	</fieldset>
	constructor(name, filter = 'OTHER') {
		let legend = document.createElement('legend');
		let anchor = document.createElement('a');
		let hidden = document.createElement('input');
		let img = document.createElement('input');
		let fieldset = document.createElement('fieldset');
		let attrName = name.toLowerCase();

		legend.textContent = name + ':';
		anchor.setAttribute('href', '#imageChooser');
		anchor.setAttribute('data-target', attrName);
		anchor.setAttribute('data-filter', filter);
		anchor.setAttribute('data-rel', 'popup');
		anchor.className = 'ui-btn ui-mini ui-corner-all ui-shadow ui-btn-icon-left ui-icon-heart';
		anchor.textContent = 'Choose...';
		hidden.setAttribute('type', 'hidden');
		hidden.setAttribute('name', attrName);
		hidden.addEventListener('valueChanged', ()=> {
//console.log(name + ' changed:' + hidden.value);
			this.resetImage();
		});
		img.setAttribute('type', 'image');
		img.addEventListener('click', e => {
			e.preventDefault();
			hidden.value = '';
			this.resetImage();
		});
		fieldset.appendChild(legend);
		fieldset.appendChild(anchor);
		fieldset.appendChild(hidden);
		fieldset.appendChild(img);
		//
		this.fieldset = fieldset;
		this.button = anchor;
		this.hidden = hidden;
		this.img = img;
	}

	resetImage() {
		let id = this.hidden.value;

		if (id) {
			this.img.setAttribute('src', '/image/src/' + id);
			$(this.img).show();
			$(this.button).hide();
		} else {
			this.img.removeAttribute('src');
			$(this.img).hide();
			$(this.button).show();
		}
	}
}

class AccessibleRange {
	//	<fieldset class="access" data-role="controlgroup" data-type="horizontal" data-mini="true">
	//	  <legend>Access:</legend>
	//	  <input type="radio" name="access" id="stageAccess0" value="0" checked="checked"/>
	//	  <label for="stageAccess0">Private</label>
	//	  <input type="radio" name="access" id="stageAccess1" value="1"/>
	//	  <label for="stageAccess1">Protected</label>
	//	  <input type="radio" name="access" id="stageAccess2" value="2"/>
	//	  <label for="stageAccess2">Public</label>
	//	</fieldset>
	constructor(fieldset, prefix) {
		let legend = document.createElement('legend');

		legend.textContent = 'Access:';
		Object.keys(AccessibleRange.List).forEach(key => {
			let id = prefix + key;
			let input = document.createElement('input');
			let label = document.createElement('label');

			input.setAttribute('id', id);
			input.setAttribute('type', 'radio');
			input.setAttribute('name', 'access');
			input.setAttribute('value', key);
			label.setAttribute('for', id);
			label.textContent = AccessibleRange.List[key];
			fieldset.append(input);
			fieldset.append(label);
		});
		fieldset.setAttribute('data-role', 'controlgroup');
		fieldset.setAttribute('data-type', 'horizontal');
		fieldset.setAttribute('data-mini', 'true');
		fieldset.append(legend);
		$(fieldset).parents('form').trigger('create');
	}
}
AccessibleRange.List = {0:'Private', 1:'Protected', 2:'Public'};

class EditStagePanel {
	constructor(appMain) {
		this.appMain = appMain;
		this.panel = document.getElementById('editStagePanel');
		this.roll = this.panel.querySelector('select');
		this.rec = {};
		this.setupEvent();
	}

	setupEvent() {
		this.roll.addEventListener('change', ()=> {
			this.rec.roll = this.roll.value;
		});
		// edit map
		let editButton = this.panel.querySelector('.ui-icon-edit');

		editButton.addEventListener('click', ()=> {
			window.open('/stage/edit/' + this.rec.id);
		});
		// remove map
		let deleteButton = this.panel.querySelector('.ui-icon-delete');

		deleteButton.addEventListener('click', ()=> {
			this.appMain.removeStage(this.rec.stageId);
			$(this.panel).panel('close');
		});
		//
		$(this.panel).on('panelclose', ()=> {
			this.appMain.updateStage(this.rec);
		});
	}

	open(rec) {
		this.rec = rec;
		$(this.roll).val([rec.roll]).selectmenu('refresh');
	}
}

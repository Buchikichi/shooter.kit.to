class PanelBase {
	constructor(panelId, parent) {
		this.panel = document.getElementById(panelId);
		this.parent = parent;
		this.setupEvents();
	}

	setupEvents() {}
}

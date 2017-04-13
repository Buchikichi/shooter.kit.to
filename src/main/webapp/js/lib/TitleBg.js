class TitleBg {
	constructor() {
		this.x = 0;
		this.width = 1200;
		this.move();
	}
	move(tm = 0) {
		let header = document.querySelector('div[data-role=header]');

		header.style.backgroundPosition = (-this.x) + 'px 0';
		this.x++;
		if (this.width < this.x) {
			this.x = 0;
		}
		requestAnimationFrame(tm => this.move(tm));
	}
}

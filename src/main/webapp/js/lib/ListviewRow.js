class ListviewRow {
	constructor(rec, imgsrc = null) {
		let img = document.createElement('img');
		let name = document.createElement('span');
		let description = document.createElement('p');
		let anchor = document.createElement('a');
		let li = document.createElement('li');

		if (imgsrc != null) {
			img.setAttribute('src', imgsrc);
		}
		name.textContent = rec.name;
		description.textContent = rec.description;
		if (rec.href) {
			anchor.setAttribute('href', rec.href);
		}
		anchor.append(img);
		anchor.append(name);
		anchor.append(description);
		if (rec.count) {
			let count = document.createElement('span');

			count.classList.add('ui-li-count');
			count.textContent = rec.count;
			anchor.append(count);
		}
		li.append(anchor);
		this.img = img;
		this.anchor = anchor;
		this.li = li;
	}
}

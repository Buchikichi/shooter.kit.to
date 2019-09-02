class VisualManager extends Repository {
	constructor() {
		super();
	}

	makeName(key) {
		return '/visual/src/' + key;
	}

	load(key, name, contentType) {
		if (!contentType.startsWith('image')) {
			super.load(key, name, contentType);
			return;
		}
		let img = new Image();

		this.max++;
//console.log('Image.reserve:' + src);
		img.onload = ()=> {
//console.log('Image.onload:' + src);
			this.onload(key, name, img);
		};
		img.src = this.makeName(key);
	}
}
VisualManager.Instance = new VisualManager();

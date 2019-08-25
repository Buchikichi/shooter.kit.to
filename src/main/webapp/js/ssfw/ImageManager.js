class ImageManager {
	constructor() {
		this.max = 0;
		this.loaded = 0;
		this.dic = {};
	}

	isComplete() {
		return 0 < this.max && this.max == this.loaded;
	}

	reserve(...list) {
		list.forEach(src => {
			if (src in this.dic) {
				return;
			}
			let img = new Image();

//console.log('Image.reserve:' + src);
			img.onload = ()=> {
//console.log('Image.onload:' + src);
				this.dic[src] = img;
				this.loaded++;
			};
			if (src.length == 36) {
				img.src = '/visual/src/' + src;
			} else {
				img.src = '/visual/name/' + src;
			}
			this.max++;
		});
	}
}
ImageManager.Instance = new ImageManager();

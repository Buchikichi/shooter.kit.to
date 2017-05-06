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
// TODO いずれIDのみに修正する予定
if (src.length == 36)
			img.src = '/image/src/' + src;
else
			img.src = '/img/' + src;
			this.max++;
		});
	}
}
ImageManager.Instance = new ImageManager();

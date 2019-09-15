class Mediaset {
	constructor() {
		this.mediaset = null;
		this.visualDic = {};
	}

	selectEntity(meidasetId) {
		return new MediasetEntity().select(meidasetId).then(mediaset => {
			this.mediaset = mediaset;
		});
	}

	loadVisual(meidasetId) {
		return this.selectEntity(meidasetId).then(()=>{
			this.mediaset.visualList.forEach(rec => {
				let key = rec.visualType + ':' + rec.visualSeq;

				this.visualDic[key] = rec;
				VisualManager.Instance.reserve(rec.id, rec.name, rec.contentType);
			});
		});
	}

	load(meidasetId) {
	}

	getVisual(visualId) {
		let result = null;

		this.mediaset.visualList.forEach(visual => {
			if (visual.id == visualId) {
				result = visual;
			}
		});
		return result;
	}

	getImage(rec) {
		let result = null;
		let key = rec.visualType + ':' + rec.visualSeq;
		let visual = this.visualDic[key];

		return VisualManager.Instance.dic[visual.id];
	}
}
Mediaset.Instance = new Mediaset();

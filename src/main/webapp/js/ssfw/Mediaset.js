class Mediaset {
	constructor() {
		this.audioDic = {};
		this.visualDic = {};
	}

	loadAudio() {
		this.audioList.forEach(audio => {
			let key = audio.audioType + ':' + audio.audioSeq;

			this.audioDic[key] = audio;
			AudioMixer.INSTANCE.reserve(audio.id, audio.name);
		});
		return this;
	}

	loadVisual() {
		this.visualList.forEach(visual => {
			let key = visual.visualType + ':' + visual.visualSeq;

			this.visualDic[key] = visual;
			VisualManager.Instance.reserve(visual.id, visual.name, visual.contentType);
		});
		return this;
	}

	load() {
		return this.loadAudio().loadVisual();
	}

	getVisual(visualId) {
		let result = null;

		this.visualList.forEach(visual => {
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

	static create(obj) {
		if ('string' == typeof obj) {
			return new MediasetEntity().select(obj).then(mediaset => {
				return Mediaset.create(mediaset);
			});
		}
		Mediaset.Instance = Object.assign(new Mediaset(), obj);
		return Mediaset.Instance;
	}
}
Mediaset.Instance = null;

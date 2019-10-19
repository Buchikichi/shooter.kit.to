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

	checkLoading(callback) {
		let repositories = [VisualManager.Instance, AudioMixer.INSTANCE];
		let max = repositories.reduce((a, c) => a.max + c.max);
		let checkLoading = ()=>{
			let loaded = repositories.reduce((a, c) => a.loaded + c.loaded);

			callback(loaded, max);
		};
		return Promise.all([
			VisualManager.Instance.checkLoading(checkLoading),
			AudioMixer.INSTANCE.checkLoading(checkLoading)
		])
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
/**
 * Visual.
 */
class Visual {}
Visual.TYPE = {
	Player: 0,
	Shot: 1,
	Item: 2,
	Aerial: 3,
	Subaerial: 4,
	Boss: 5,
	Ornament: 6,
	Explosion: 7,
	Background: 8,
	Foreground: 9,
	Other: 10,
};

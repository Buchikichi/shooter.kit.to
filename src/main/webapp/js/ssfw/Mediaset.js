class Mediaset {
	constructor() {
		this.audioDic = {};
		this.visualDic = {};
	}

	loadAudio() {
		this.audioList.forEach(audio => {
			this.audioDic[audio.audioSeq] = audio;
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

	checkLoading(callback = null) {
		let repositories = [VisualManager.Instance, AudioMixer.INSTANCE];
		let max = repositories.reduce((a, c) => a.max + c.max);
		let checkLoading = ()=>{
			let loaded = repositories.reduce((a, c) => a.loaded + c.loaded);

			if (callback) {
				callback(loaded, max);
			}
		};
		return Promise.all([
			VisualManager.Instance.checkLoading(checkLoading),
			AudioMixer.INSTANCE.checkLoading(checkLoading)
		])
	}

	getAudioById(audioId) {
		let result = null;

		this.audioList.forEach(audio => {
			if (audio.id == audioId) {
				result = audio;
			}
		});
		return result;
	}

	getAudio(audioSeq) {
		return this.audioDic[audioSeq];
	}

	playBgm(audioSeq) {
		let audio = this.getAudio(audioSeq);

		if (audio) {
			AudioMixer.INSTANCE.play(audio.id, .99, true);
		}
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
		let key = rec.visualType + ':' + rec.visualSeq;
		let visual = this.visualDic[key];

		return VisualManager.Instance.dic[visual.id];
	}

	getImageName(rec) {
		let key = rec.visualType + ':' + rec.visualSeq;
		let visual = this.visualDic[key];

		return visual.name;
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

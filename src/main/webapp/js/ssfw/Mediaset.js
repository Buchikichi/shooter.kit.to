class Mediaset {
	constructor() {
		this.audioDic = {};
		this.visualDic = {};
		this._actorDic = {};
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
			this.visualDic[visual.visualSeq] = visual;
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

	getVisualBySeq(rec) {
		// console.log('Mediaset#getVisualBySeq:' + rec.visualSeq);
		let visual = this.visualDic[rec.visualSeq];

		if (visual == null) {
			let key12 = rec.visualSeq.substr(0, 12);
			let key = Object.keys(this.visualDic).find(key => key.substr(0, 12) == key12);

			// console.log('Mediaset#getVisualBySeq:' + key12);
			// console.log(rec);
			visual = this.visualDic[key];
			if (visual) {
				rec.visualSeq = visual.visualSeq;
				// console.log(visual);
			}
		}
		return visual;
	}

	getImage(rec) {
		let visual = this.getVisualBySeq(rec);

		return VisualManager.Instance.dic[visual.id];
	}

	getImageName(rec) {
		let visual = this.getVisualBySeq(rec);

		return visual.name;
	}

	getActor(seq, params = {}) {
		let actor = this._actorDic[seq];

		// if (actor && actor.score == -123) {
		// 	console.log('Product#getActor -123:' + seq);
		// 	actor = this.actorList.find(a => a.score != -123 && a.className == actor.className);
		// }
		// if (!actor) {
		// 	let key12 = seq.substr(0, 12);
		// 	let key = Object.keys(this._actorDic).find(key => key.substr(0, 12) == key12);

		// 	actor = this._actorDic[key];
		// 	if (!actor) {
		// 		let dec = parseInt(seq, 16)
		// 		let pseudo = Enemy.getActor(dec);

		// 		if (pseudo) {
		// 			actor = this.actorList.find(a => a.className == pseudo.name);
		// 		}
		// 	}
		// }
		if (!actor) {
			// console.log('Mediaset#getActor fail:' + seq);
			return null;
		}
		if (actor.type == Actor.Type.Player) {
			// console.log('Mediaset#getActor Actor.Type.Player');
			return Ship.create(actor, Object.assign(params));
		}
		if (actor.type == Actor.Type.Item) {
			// console.log('Mediaset#getActor Actor.Type.Item');
			return Capsule.create(actor, Object.assign(params));
		}
		return Enemy.create(actor, Object.assign(params));
	}

	init() {
		this.actorList.forEach(actor => {
			this._actorDic[actor.seq] = actor
			this._actorDic[actor.id] = actor
		});
		this.actorList.forEach(actor => this._actorDic[actor.seqOld] = actor); // TODO: remove
		return this;
	}

	static create(obj) {
		if ('string' == typeof obj) {
			return new MediasetEntity().select(obj).then(mediaset => {
				return Mediaset.create(mediaset);
			});
		}
		Mediaset.Instance = Object.assign(new Mediaset(), obj).init();
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

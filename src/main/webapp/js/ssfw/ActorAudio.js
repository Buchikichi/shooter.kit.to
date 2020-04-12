class ActorAudio {
	constructor() {
	}

	play() {
		let pan = Product.Instance.calcPan(this._actor);

		// console.log('ActorAudio#play');
		// console.log(this._audio);
		AudioMixer.INSTANCE.play(this._audio.id, this._volume, false, pan);
	}

	init() {
		// console.log('ActorVisual#init:' + this.visualSeq);
		this._audio = Mediaset.Instance.getAudio(this.audioSeq);
		this._volume = this.volume / 100;
		return this;
	}

	static create(rec, actor) {
		return Object.assign(new ActorAudio(), rec, { _actor: actor }).init();
	}
}
ActorAudio.AudioType = {
	Action: 0,
	Reaction: 1,
	Explosion: 2,
	Notice: 3,
	Introduction: 4,
	Theme: 5,
	Boss: 6,
	Ending: 7,
}

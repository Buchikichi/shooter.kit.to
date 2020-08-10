/**
 * AudioMixer.
 */
class AudioMixer extends Repository {
	constructor() {
		super();
		this.type = 'arraybuffer';
		this.ctx = null;
		if (window.AudioContext || window.webkitAudioContext) {
			this.ctx = new (window.AudioContext || window.webkitAudioContext)();
		}
		this.dic = [];
		this.bgm = [];
		this.reserves = [];
		this.lastKey = null;
		this.lastTime = null;
		this.lastOffset = 0;
	}

	makeName(key) {
		let ua = navigator.userAgent.toLowerCase();
		let isId = key.length == 36;

		if (ua.indexOf('edge') !== -1 || ua.indexOf('safari') !== -1) {
			if (isId) {
				return '/audio/audio/' + key;
			}
			return '/audio/audioName/' + key;
		}
		if (isId) {
			return '/audio/webm/' + key;
		}
		return '/audio/webmName/' + key;
	}

	onload(key, name, data) {
		if (this.ctx === null) {
			this.done();
			return;
		}
		this.ctx.decodeAudioData(data, (buff) => {
			this.dic[key] = buff;
			if (name) {
				this.dic[name] = buff;
			}
			this.done();
		});
	}

	play(key, volume = 1, isBgm = false, pan = 0, offset = 0) {
		if (this.ctx === null || !this.dic[key]) {
			return;
		}
		let buff = this.dic[key];
		let element = new AudioElement(this.ctx, buff, offset);

		if (isBgm) {
			//console.log('d:' + buff.duration);
			this.stop();
			element.source.addEventListener('ended', () => {
				if (!element.isPause) {
					this.play(key, volume, true);
				}
			});
			this.bgm.push(element);
			this.lastKey = key;
			this.lastTime = this.ctx.currentTime - offset
		}
		//console.log('offset:' + offset);
		element.gainNode.gain.value = volume;
		element.setPan(pan);
	}

	setPan(panValue) {
		this.bgm.forEach(e => e.setPan(panValue));
	}

	fade() {
		this.bgm.forEach(e => e.fade());
	}

	stop() {
		this.bgm.forEach(e => e.stop());
		this.bgm = this.bgm.filter(e => !e.done);
	}

	pause() {
		this.bgm.forEach(e => e.pause());
		this.lastOffset = this.ctx.currentTime - this.lastTime;
	}

	resume() {
		this.play(this.lastKey, 1, true, 0, this.lastOffset);
	}

	getCurrentTime() {
		if (!this.bgm.length) {
			return null;
		}
		return this.ctx.currentTime - this.lastTime;
	}

	setCurrentTime(time) {
		if (!this.bgm.length) {
			return;
		}
		//console.log('setCurrentTime:' + time);
		this.stop();
		this.play(this.lastKey, 1, true, 0, time);
	}
}
AudioMixer.INSTANCE = new AudioMixer();


/**
 * AudioElement.
 */
class AudioElement {
	constructor(ctx, buff, offset) {
		this.isPause = false;
		this.done = false;
		this.source = ctx.createBufferSource();
		this.gainNode = ctx.createGain();
		this.gainNode.connect(ctx.destination);
		if ('function' == typeof ctx.createStereoPanner) {
			this.panNode = ctx.createStereoPanner();
			this.panNode.connect(this.gainNode);
			this.source.connect(this.panNode);
		} else {
			this.panNode = null;
			this.source.connect(this.gainNode);
		}
		this.source.buffer = buff;
		this.source.start(0, offset);
		this.source.addEventListener('ended', () => this.done = true);
	}

	setPan(panValue) {
		// The value can range between -1 (full left pan) and 1 (full right pan).
		if (this.panNode) {
			this.panNode.pan.value = panValue;
		}
	}

	fade() {
		let gain = this.gainNode.gain;
		let val = gain.value;
		let fading = () => {
			if (Math.floor(val * 100) == 0) {
				this.stop();
				return;
			}
			val *= .9;
			gain.value = val;
			setTimeout(fading, 600);
		};
		fading();
	}

	pause() {
		this.isPause = true;
		this.source.stop();
	}

	stop() {
		this.source.stop();
	}
}

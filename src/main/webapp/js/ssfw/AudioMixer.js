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
		this.lastKey = null;
		this.lastTime = null;
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
		this.ctx.decodeAudioData(data, (buff)=> {
			this.dic[key] = buff;
			if (name) {
				this.dic[name] = buff;
			}
			this.done();
		});
	}

	play(key) {
		if (this.ctx === null || !this.dic[key]) {
			return;
		}
		let mixer = this;
		let len = arguments.length;
		let volume = 1 < len ? arguments[1] : 1;
		let isBgm = 2 < len ? arguments[2] : false;
		let pan = 3 < len ? arguments[3] : 0;
		let offset = 4 < len ? arguments[4] : 0;
		let buff = this.dic[key];
		let element = new AudioElement(this.ctx, buff, offset);

		if (isBgm) {
	//console.log('d:' + buff.duration);
			this.stop();
			element.source.loopEnd = buff.duration;
			element.source.loop = true;
			this.bgm.push(element);
			this.lastKey = key;
		}
	//console.log('offset:' + offset);
		element.gainNode.gain.value = volume;
		element.setPan(pan);
		this.lastTime = this.ctx.currentTime - offset;
	}

	setPan(panValue) {
		this.bgm.forEach(function(element) {
			element.setPan(panValue);
		});
	}

	fade() {
		this.bgm.forEach(function(element) {
			element.fade();
		});
	}

	stop() {
		this.bgm.forEach(function(element) {
			element.stop();
		});
	}

	getCurrentTime() {
		if (0 < this.bgm.length) {
			let validList = [];

			this.bgm.forEach(function(element) {
				if (!element.done) {
					validList.push(element);
				}
			});
			this.bgm = validList;
		}
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
function AudioElement(ctx, buff, offset) {
	let element = this;

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
	this.source.onended  = function() {
		element.done = true;
	}
}

AudioElement.prototype.setPan = function(panValue) {
	// The value can range between -1 (full left pan) and 1 (full right pan).
	if (this.panNode) {
		this.panNode.pan.value = panValue;
	}
};

AudioElement.prototype.fade = function() {
	let element = this;
	let gain = this.gainNode.gain;
	let val = gain.value;
	let fading = function() {
		if (Math.floor(val * 100) == 0) {
			element.stop();
			return;
		}
		val *= .9;
		gain.value = val;
		setTimeout(fading, 600);
	};
	fading();
};

AudioElement.prototype.stop = function() {
	if (!this.done) {
		this.source.stop();
	}
};

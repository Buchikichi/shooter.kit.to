class AudioEntity extends EntityBase {
	constructor() {
		super('audio');
	}
}
AudioEntity.Type = {
	OTHER: 0,
	FX: 1,
	BGM: 2,
};

class ImageEntity extends EntityBase {
	constructor() {
		super('image');
	}
}
ImageEntity.Type = {
	OTHER: 0,
	ACT: 1,
	BACK: 2,
	FORE: 3,
};

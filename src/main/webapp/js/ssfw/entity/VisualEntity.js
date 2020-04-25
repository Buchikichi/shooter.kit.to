class VisualEntity extends EntityBase {
	constructor() {
		super('visual');
	}
}
VisualEntity.Type = {
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

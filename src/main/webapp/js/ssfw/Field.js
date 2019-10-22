/**
 * Field.
 */
class Field extends Matter {
	constructor(view) {
		super();
		this.setRect(view.width, view.height);
		this.setupLandform(view);
		Field.Instance = this;
	}

	setupLandform(view) {
		this.landform = new Landform(view.canvas);
	}
}
Field.MAX_ENEMIES = 100;
Field.ENEMY_CYCLE = 10;

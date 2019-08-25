package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum VisualType {
	Player(0),
	Shot(1),
	Item(2),
	Aerial(3),
	Subaerial(4),
	Boss(5),
	Ornament(6),
	Explosion(7),
	Background(8),
	Foreground(9),
	Other(10),
	;
	private int ix;

	VisualType(int value) {
		this.ix = value;
	}

	public static VisualType[] List = { Player, Shot, Item, Aerial, Subaerial, Boss, Ornament, Explosion, Background, Foreground, Other };

	public static VisualType getType(int value) {
		VisualType result = Player;

		for (VisualType type : values()) {
			if (type.ix <= value) {
				result = type;
			}
		}
		return result;
	}
}

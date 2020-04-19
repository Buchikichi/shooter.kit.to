package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

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
	None(-1),
	;
	@JsonValue
	private int ix;

	VisualType(int value) {
		this.ix = value;
	}

	public static VisualType[] List = { Player, Shot, Item, Aerial, Subaerial, Boss, Ornament, Explosion, Background, Foreground, Other };

	@JsonCreator
	public static VisualType fromValue(int value) {
		VisualType result = None;

		for (VisualType type : values()) {
			if (type.ix == value) {
				result = type;
				break;
			}
		}
		return result;
	}

	public static VisualType fromString(String value) {
		return fromValue(Integer.parseInt(value));
	}
}

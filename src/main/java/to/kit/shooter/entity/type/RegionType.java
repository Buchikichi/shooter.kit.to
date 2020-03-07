package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum RegionType {
	Circle(0), Rectangle(1);

	@JsonValue
	private int ix;

	RegionType(int value) {
		this.ix = value;
	}

	public static RegionType[] List = { Circle, Rectangle };

	@JsonCreator
	public static RegionType fromValue(int value) {
		RegionType result = Circle;

		for (RegionType type : values()) {
			if (type.ix <= value) {
				result = type;
			}
		}
		return result;
	}

	public static RegionType fromString(String value) {
		return fromValue(Integer.parseInt(value));
	}
}

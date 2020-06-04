package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum OrientationType {
	Right(6), Left(4), Up(8), Down(2);

	@JsonValue
	private int value;

	OrientationType(int value) {
		this.value = value;
	}

	public static OrientationType[] List = { Right, Left, Up, Down };

	@JsonCreator
	public static OrientationType fromValue(int value) {
		OrientationType result = Right;

		for (OrientationType type : values()) {
			if (type.value <= value) {
				result = type;
			}
		}
		return result;
	}

	public static OrientationType fromString(String value) {
		return fromValue(Integer.parseInt(value));
	}
}

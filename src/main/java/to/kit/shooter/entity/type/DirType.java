package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum DirType {
	Manual(0), Fit(1), ByDegrees(2);

	@JsonValue
	private int ix;

	DirType(int value) {
		this.ix = value;
	}

	public static DirType[] List = { Manual, Fit, ByDegrees };

	@JsonCreator
	public static DirType fromValue(int value) {
		DirType result = Manual;

		for (DirType type : values()) {
			if (type.ix <= value) {
				result = type;
			}
		}
		return result;
	}

	public static DirType fromString(String value) {
		return fromValue(Integer.parseInt(value));
	}
}

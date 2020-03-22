package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

/**
 * Direction type.
 * <ul>
 *   <li>Manual: Change direction manually.</li>
 *   <li>Spin: Rotate self.</li>
 *   <li>Aim: Face the target.</li>
 *   <li>Chase: Face the target slowly.</li>
 *   <li>Fit: Match the direction to actor.</li>
 * </ul>
 * @author H.Sasai
 */
@Getter
public enum DirType {
	Manual(0), Spin(1), Aim(2), Chase(3), Fit(4);

	@JsonValue
	private int ix;

	DirType(int value) {
		this.ix = value;
	}

	public static DirType[] List = { Manual, Spin, Aim, Chase };
	public static DirType[] VisualList = { Manual, Spin, Aim, Chase, Fit };

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

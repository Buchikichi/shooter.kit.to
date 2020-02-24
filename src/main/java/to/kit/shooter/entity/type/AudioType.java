package to.kit.shooter.entity.type;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import lombok.Getter;

@Getter
public enum AudioType {
	Action(0),
	Reaction(1),
	Explosion(2),
	Notice(3),
	Introduction(4),
	Theme(5),
	Boss(6),
	Ending(7),
	;
	@JsonValue
	private int ix;

	AudioType(int value) {
		this.ix = value;
	}

	public static AudioType[] List = { Action, Reaction, Explosion, Notice, Introduction, Theme, Boss, Ending };

	@JsonCreator
	public static AudioType fromValue(int value) {
		AudioType result = Action;

		for (AudioType type : values()) {
			if (type.ix <= value) {
				result = type;
			}
		}
		return result;
	}

	public static AudioType fromString(String value) {
		return fromValue(Integer.parseInt(value));
	}
}

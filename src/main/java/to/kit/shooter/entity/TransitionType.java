package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum TransitionType {
	Off(0),
	BlackIn(1),
	WhiteIn(2),
	Spiral(3),
	Iris(4),
	;
	private int value;

	TransitionType(int value) {
		this.value = value;
	}

	public static TransitionType[] LIST = { Off, BlackIn, WhiteIn, Spiral, Iris };

	public static TransitionType getType(int value) {
		TransitionType result = Off;

		for (TransitionType type : values()) {
			if (type.value <= value) {
				result = type;
			}
		}
		return result;
	}
}

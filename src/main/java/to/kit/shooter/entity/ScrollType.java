package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum ScrollType {
	Off(0),
	On(1),
	Loop(2),
	Top(3),
	Bottom(4),
	;
	private int value;

	ScrollType(int value) {
		this.value = value;
	}

	public static ScrollType[] LIST = { Off, On, Loop, Top, Bottom };
	public static ScrollType[] DEFAULT_LIST = { Off, On, Loop };

	public static ScrollType getType(int value) {
		ScrollType result = Off;

		for (ScrollType type : values()) {
			if (type.value <= value) {
				result = type;
			}
		}
		return result;
	}
}

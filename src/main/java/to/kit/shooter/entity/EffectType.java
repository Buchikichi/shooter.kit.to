package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum EffectType {
	Off(0),
	FadeIn(1),
	FadeOut(2),
	Spiral(3),
	;
	private int value;

	EffectType(int value) {
		this.value = value;
	}

	public static EffectType[] LIST = { Off, FadeIn, FadeOut, Spiral };

	public static EffectType getType(int value) {
		EffectType result = Off;

		for (EffectType type : values()) {
			if (type.value <= value) {
				result = type;
			}
		}
		return result;
	}
}

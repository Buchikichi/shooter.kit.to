package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum ActorType {
	None(0),
	Ship(1),
	Shot(16),
	Missile(32),
	Capsule(48),
	Bullet(64),
	Material(80),
	Enemy(128),
	Formation(192),
	Boss(224),
	;
	private int ix;

	ActorType(int value) {
		this.ix = value;
	}

	public static ActorType[] List = { Enemy, Formation, Boss, Material, Bullet, Capsule, Shot, Missile, Ship };

	public static ActorType getType(int value) {
		ActorType result = None;

		for (ActorType type : values()) {
			if (type.ix <= value) {
				result = type;
			}
		}
		return result;
	}
}

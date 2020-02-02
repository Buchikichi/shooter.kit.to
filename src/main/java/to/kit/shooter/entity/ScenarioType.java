package to.kit.shooter.entity;

import lombok.Getter;

@Getter
public enum ScenarioType {
	// Actor
	Spw("op.spawn"),
	Rev("op.reverse"),
	// Mode
	Ent("op.enter"),
	Ckp("op.checkpoint"),
	Bos("op.boss_mode"),
	Stp("op.stop_scroll"),
	Nxt("op.next_stage"),
	// Effect
	Efa("op.effect_fade"),
	// Audio
	Apa("op.pause_bgm"),
	Are("op.resuem_bgm"),
	Afa("op.fade_bgm"),
	Apl("op.play_bgm"),
	;
	private String value;

	ScenarioType(String value) {
		this.value = value;
	}

	public static final ScenarioType[] MODE_LIST = { Ent, Ckp, Bos, Stp, Nxt };
	public static final ScenarioType[] EFFECT_LIST = { Efa };
	public static final ScenarioType[] AUDIO_LIST = { Apa, Are, Afa, Apl };

//	public static ScenarioType getType(int value) {
//		ScenarioType result = Off;
//
//		for (ScenarioType type : values()) {
//			if (type.value <= value) {
//				result = type;
//			}
//		}
//		return result;
//	}
}

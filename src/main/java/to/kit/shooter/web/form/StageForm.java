package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Stage form.
 * @author H.Sasai
 */
@Data
public final class StageForm {
	private String id;
	private String owner;
	private int access;
	private String name;
	private String description;
	private String map;
	private String theme;
	private String boss;
	private String bg1;
	private double bg1speed;
	private double bg1dir;
	private double bg1blink;
	private String bg2;
	private double bg2speed;
	private double bg2dir;
	private double bg2blink;
	private String bg3;
	private double bg3speed;
	private double bg3dir;
	private double bg3blink;
	private String fg1;
	private double fg1speed;
	private double fg1dir;
	private double fg1blink;
	private String fg2;
	private double fg2speed;
	private double fg2dir;
	private double fg2blink;
	private String fg3;
	private double fg3speed;
	private double fg3dir;
	private double fg3blink;
}

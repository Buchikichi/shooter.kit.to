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
	private String bg2;
	private String bg3;
	private String fg1;
	private String fg2;
	private String fg3;
}

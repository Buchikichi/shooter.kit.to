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
	private String b1;
	private String b2;
	private String b3;
	private String f1;
	private String f2;
	private String f3;
}

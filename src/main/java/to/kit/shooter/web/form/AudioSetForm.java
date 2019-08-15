package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Audio set form.
 * @author H.Sasai
 */
@Data
public final class AudioSetForm {
	private String id;
	private String owner;
	private int access;
	private String name;
	private String action;
	private String reaction;
	private String notice;
	private String introduction;
	private String theme;
	private String ending;

	private String keyword;
}

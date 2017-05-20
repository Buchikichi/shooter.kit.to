package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Actor form.
 * @author H.Sasai
 */
@Data
public final class ActorForm {
	private String id;
	private String owner;
	private int access;
	private String name;
	private String description;
	private String imageid;
	private int type;
	private String anim;
	private String properties;
	private String routine;
	private String method;
	private String script;

	private String keyword;
}

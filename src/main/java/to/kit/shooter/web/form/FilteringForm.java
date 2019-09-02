package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Filtering form.
 * @author H.Sasai
 */
@Data
public final class FilteringForm {
	private String mediasetId;
	private String owner;
	private int access;
	private int type;
}

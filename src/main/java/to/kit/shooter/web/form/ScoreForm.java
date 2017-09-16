package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Score form.
 * @author H.Sasai
 */
@Data
public final class ScoreForm {
	private String productId;
	private int score;
	private String name;
}

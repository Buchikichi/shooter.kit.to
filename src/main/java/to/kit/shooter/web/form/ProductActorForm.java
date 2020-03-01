package to.kit.shooter.web.form;

import lombok.Data;
import to.kit.shooter.entity.ActorVisual;

/**
 * Product actor form.
 * @author H.Sasai
 */
@Data
public class ProductActorForm {
	private String id;
	private int type;
	private int seq;

	private ActorVisual actor;
}

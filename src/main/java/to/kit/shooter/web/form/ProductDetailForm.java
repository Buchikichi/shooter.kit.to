package to.kit.shooter.web.form;

import lombok.Data;
import to.kit.shooter.entity.Stage;

/**
 * Product detail form.
 * @author H.Sasai
 */
@Data
public class ProductDetailForm {
	private String id;
	private int seq;
	private int roll;
	private String map;

	private Stage stage;
}

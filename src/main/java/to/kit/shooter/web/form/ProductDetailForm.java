package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Product detail form.
 * @author H.Sasai
 */
@Data
public class ProductDetailForm {
	private String id;
	private String stageId;
	private int seq;
	private int roll;
	private String map;
}

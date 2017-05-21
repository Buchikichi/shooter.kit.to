package to.kit.shooter.web.form;

import java.util.List;

import lombok.Data;

/**
 * Product form.
 * @author H.Sasai
 */
@Data
public class ProductForm {
	private String id;
	private String name;
	private String description;
	private int access;
	private int width;
	private int height;
	private List<ProductDetailForm> detail;
	private List<ProductActorForm> actorList;
}

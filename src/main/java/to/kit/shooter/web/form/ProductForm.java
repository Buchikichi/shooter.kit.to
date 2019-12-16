package to.kit.shooter.web.form;

import java.util.List;

import lombok.Data;
import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.entity.ProductActor;
import to.kit.shooter.entity.Stage;

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
	private List<Stage> stageList;
	private List<ProductActor> actorList;
	private Mediaset mediaset;
}

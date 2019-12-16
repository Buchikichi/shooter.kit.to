package to.kit.shooter.web.form;

import java.util.List;

import lombok.Data;
import to.kit.shooter.entity.Scenario;
import to.kit.shooter.entity.Map;

/**
 * Product detail form.
 * @author H.Sasai
 */
@Data
public class ProductDetailForm {
	private String id;
	private int seq;
	private int roll;
	private List<Scenario> scenarioList;

	private Map map;
}

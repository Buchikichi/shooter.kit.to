package to.kit.shooter.web.form;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;
import to.kit.shooter.entity.MapVisual;

/**
 * Map form.
 * @author H.Sasai
 */
@Data
public final class MapForm {
	private String id;
	private String stageId;
	private int mainSeq;
	private String name;
	private String map;
	private int brickSize;

	private List<MapVisual> mapVisualList = new ArrayList<>();
}

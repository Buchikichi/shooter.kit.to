package to.kit.shooter.web.form;

import java.util.ArrayList;
import java.util.List;

public class ResultListForm extends ResultForm<List<ListItem>> {
	/** serialVersionUID. */
	private static final long serialVersionUID = 6449877942351172621L;

	public ResultListForm() {
		setResult(new ArrayList<ListItem>());
	}
}

package to.kit.shooter.web.form;

import java.io.Serializable;

import lombok.Data;

@Data
public class ResultForm implements Serializable {
	/** serialVersionUID. */
	private static final long serialVersionUID = 6011619095358125138L;

	private boolean ok;
	private Object info;
}

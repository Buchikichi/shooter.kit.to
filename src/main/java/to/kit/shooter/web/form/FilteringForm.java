package to.kit.shooter.web.form;

import lombok.Data;

/**
 * Filtering form.
 * @param <T> criteria type
 * @author H.Sasai
 */
@Data
public final class FilteringForm<T> {
	T criteria;
	private boolean edit;
//	private String owner;
//	private int access;
}

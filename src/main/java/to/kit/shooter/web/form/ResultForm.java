package to.kit.shooter.web.form;

import java.io.Serializable;

public class ResultForm<T> implements Serializable {
	/** serialVersionUID. */
	private static final long serialVersionUID = 6011619095358125138L;

	private boolean ok;
	private T result;
	/**
	 * @return the ok
	 */
	public boolean isOk() {
		return this.ok;
	}
	/**
	 * @param ok the ok to set
	 */
	public void setOk(boolean ok) {
		this.ok = ok;
	}
	/**
	 * @return the result
	 */
	public T getResult() {
		return this.result;
	}
	/**
	 * @param result the result to set
	 */
	public void setResult(T result) {
		this.result = result;
	}
}

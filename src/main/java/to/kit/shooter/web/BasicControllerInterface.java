package to.kit.shooter.web;

import to.kit.shooter.web.form.ResultListForm;

/**
 * コントローラー基本機能.
 * @param <T> レコード情報
 * @author H.Sasai
 */
public interface BasicControllerInterface<T> {
	/**
	 * リスト取得.
	 * @return リスト
	 */
	public ResultListForm list();

	/**
	 * レコード取得.
	 * @param id レコードID
	 * @return レコード
	 */
	public T select(String id);
}

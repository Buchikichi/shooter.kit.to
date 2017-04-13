package to.kit.shooter.web;

import java.util.List;

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
	public List<T> list();

	/**
	 * レコード取得.
	 * @param id レコードID
	 * @return レコード
	 */
	public T select(String id);
}

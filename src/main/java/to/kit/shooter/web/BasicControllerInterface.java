package to.kit.shooter.web;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;

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
	ResultListForm list();

	/**
	 * レコード取得.
	 * @param id レコードID
	 * @return レコード
	 */
	T select(String id);

	/**
	 * 編集画面表示.
	 * @param model モデル
	 * @param id レコードID
	 * @return 画面
	 */
	String edit(Model model, @PathVariable("id") String id);
}

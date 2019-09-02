package to.kit.shooter.web;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultListForm;

/**
 * コントローラー基本機能.
 * @param <T> レコード情報
 * @author H.Sasai
 */
public interface BasicControllerInterface<T> {
	/**
	 * リスト取得.
	 * @param form フォーム
	 * @return リスト
	 */
	ResultListForm list(FilteringForm form);

	/**
	 * レコード取得.
	 * @param id レコードID
	 * @return レコード
	 */
	T select(@RequestParam String id);

	/**
	 * 編集画面表示.
	 * @param model モデル
	 * @param id レコードID
	 * @return 画面
	 */
	default String edit(Model model, @PathVariable("id") String id) {
		return null;
	}
}

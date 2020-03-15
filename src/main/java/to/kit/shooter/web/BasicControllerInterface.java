package to.kit.shooter.web;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * コントローラー基本機能.
 * @param <T> entity type
 * @author H.Sasai
 */
interface BasicControllerInterface<T> {
	/**
	 * リスト取得.
	 * @param model Model
	 * @param form 条件
	 * @return 一覧
	 */
	String list(Model model, @RequestBody FilteringForm<T> form);

	/**
	 * レコード取得.
	 * @param id レコードID
	 * @return レコード
	 */
	T select(@PathVariable("id") String id);

	/**
	 * 編集画面表示.
	 * @param model モデル
	 * @param id レコードID
	 * @return 画面
	 */
	default String edit(Model model, @PathVariable("id") String id) {
		return null;
	}

	/**
	 * 保存.
	 * @param body 保存したい値
	 * @return フォーム
	 */
	default ResultForm<T> save(@RequestBody T body) {
		return null;
	}
}

package to.kit.shooter.web;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
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
	 * @param body values to be save
	 * @param oauth2User OAuth2 user
	 * @return フォーム
	 */
	default ResultForm<T> save(@AuthenticationPrincipal OAuth2User oauth2User, @RequestBody T body) {
		return null;
	}
}

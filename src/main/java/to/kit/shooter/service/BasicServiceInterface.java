package to.kit.shooter.service;

import java.util.List;

import to.kit.shooter.web.form.FilteringForm;

/**
 * サービス基本機能.
 * @param <T> entity type
 * @author H.Sasai
 */
interface BasicServiceInterface<T> {
	List<T> list(FilteringForm<T> form);
	T select(String id);
}

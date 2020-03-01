package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Actor;

/**
 * プロダクトアクター.
 * @author H.Sasai
 */
public interface ActorRepository extends JpaRepository<Actor, String> {
	/**
	 * プロダクト内のアクターを全て取得.
	 * @param productId プロダクトID
	 * @return アクター一覧
	 */
	List<Actor> findByProductId(String productId);
}

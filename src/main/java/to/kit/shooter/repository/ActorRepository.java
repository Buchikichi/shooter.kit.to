package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.type.VisualType;

/**
 * プロダクトアクター.
 * @author H.Sasai
 */
public interface ActorRepository extends JpaRepository<Actor, String>, JpaSpecificationExecutor<Actor> {
	/**
	 * プロダクト内のアクターを全て取得.
	 * @param productId プロダクトID
	 * @return アクター一覧
	 */
	List<Actor> findByProductId(String productId);
	List<Actor> findByProductIdAndTypeOrderByClassName(String productId, VisualType type);
}

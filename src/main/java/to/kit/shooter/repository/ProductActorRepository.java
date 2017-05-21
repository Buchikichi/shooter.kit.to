package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.ProductActor;

/**
 * プロダクトアクター.
 * @author H.Sasai
 */
public interface ProductActorRepository extends JpaRepository<ProductActor, String> {
	/**
	 * プロダクト内のアクターを全て取得.
	 * @param productId プロダクトID
	 * @return アクター一覧
	 */
	List<ProductActor> findByProductId(String productId);
}

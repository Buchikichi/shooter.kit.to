package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.ProductDetail;

/**
 * プロダクト詳細.
 * @author H.Sasai
 */
public interface ProductDetailRepository extends JpaRepository<ProductDetail, String> {
	/**
	 * プロダクト内のステージを全て取得.
	 * @param productId プロダクトID
	 * @return ステージ一覧
	 */
	List<ProductDetail> findByProductId(String productId);
}

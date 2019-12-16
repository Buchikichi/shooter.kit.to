package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Stage;

/**
 * ステージ.
 * @author H.Sasai
 */
public interface StageRepository extends JpaRepository<Stage, String> {
	/**
	 * プロダクト内のステージを全て取得.
	 * @param productId プロダクトID
	 * @return ステージ一覧
	 */
	List<Stage> findByProductId(String productId);
}

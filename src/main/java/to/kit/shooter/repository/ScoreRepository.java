package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Scores;

/**
 * スコアリポジトリー.
 * @author H.Sasai
 */
public interface ScoreRepository extends JpaRepository<Scores, String>, JpaSpecificationExecutor<Scores> {
	List<Scores> findAllByProductIdOrderByScoreDesc(String productId);
}

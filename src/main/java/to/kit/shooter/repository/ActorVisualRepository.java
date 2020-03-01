package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.ActorVisual;

/**
 * アクターリポジトリー.
 * @author H.Sasai
 */
public interface ActorVisualRepository extends JpaRepository<ActorVisual, String>, JpaSpecificationExecutor<ActorVisual> {
	// nop
}

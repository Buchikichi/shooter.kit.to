package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Actor;

/**
 * アクターリポジトリー.
 * @author H.Sasai
 */
public interface ActorRepository extends JpaRepository<Actor, String>, JpaSpecificationExecutor<Actor> {
	// nop
}

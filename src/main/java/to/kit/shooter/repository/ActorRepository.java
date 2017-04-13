package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Actor;

/**
 * @author H.Sasai
 */
public interface ActorRepository extends JpaRepository<Actor, String> {
	// nop
}

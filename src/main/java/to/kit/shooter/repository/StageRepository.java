package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Stage;

/**
 * @author H.Sasai
 */
public interface StageRepository extends JpaRepository<Stage, String> {
	// nop
}

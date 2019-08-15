package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.AudioSet;

/**
 * @author H.Sasai
 */
public interface AudioSetRepository extends JpaRepository<AudioSet, String>, JpaSpecificationExecutor<AudioSet> {
	// nop
}

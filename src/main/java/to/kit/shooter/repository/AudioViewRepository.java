package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.AudioView;

/**
 * @author H.Sasai
 */
public interface AudioViewRepository extends JpaRepository<AudioView, String>, JpaSpecificationExecutor<AudioView> {
	// nop
}

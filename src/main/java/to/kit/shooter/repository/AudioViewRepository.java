package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.AudioView;

/**
 * @author H.Sasai
 */
public interface AudioViewRepository extends JpaRepository<AudioView, String> {
	// nop
}

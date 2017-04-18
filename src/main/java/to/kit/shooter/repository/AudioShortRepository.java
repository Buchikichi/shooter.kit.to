package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.AudioShort;

/**
 * @author H.Sasai
 */
public interface AudioShortRepository extends JpaRepository<AudioShort, String> {
	// nop
}

package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.ImageShort;

/**
 * ImageRepository.
 * @author H.Sasai
 */
public interface ImageShortRepository extends JpaRepository<ImageShort, String> {
	// nop
}

package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.ImageShort;

/**
 * ImageRepository.
 * @author H.Sasai
 */
public interface ImageShortRepository extends JpaRepository<ImageShort, String>, JpaSpecificationExecutor<ImageShort> {
	// nop
}

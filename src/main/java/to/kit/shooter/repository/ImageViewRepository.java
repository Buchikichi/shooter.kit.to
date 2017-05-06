package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.ImageView;

/**
 * ImageRepository.
 * @author H.Sasai
 */
public interface ImageViewRepository extends JpaRepository<ImageView, String>, JpaSpecificationExecutor<ImageView> {
	// nop
}

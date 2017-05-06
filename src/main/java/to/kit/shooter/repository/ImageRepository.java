package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Image;

/**
 * @author H.Sasai
 */
public interface ImageRepository extends JpaRepository<Image, String> {
	Image findByName(String name);
}

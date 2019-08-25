package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Visual;

/**
 * @author H.Sasai
 */
public interface VisualRepository extends JpaRepository<Visual, String> {
	Visual findByName(String name);
}

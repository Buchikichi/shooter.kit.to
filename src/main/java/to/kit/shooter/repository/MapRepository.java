package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Map;

/**
 * @author H.Sasai
 */
public interface MapRepository extends JpaRepository<Map, String> {
	// nop
}

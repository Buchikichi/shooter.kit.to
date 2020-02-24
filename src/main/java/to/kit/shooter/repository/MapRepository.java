package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Map;

/**
 * @author H.Sasai
 */
public interface MapRepository extends JpaRepository<Map, String>, JpaSpecificationExecutor<Map> {
	// nop
}

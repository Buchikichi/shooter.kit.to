package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Mediaset;

/**
 * @author H.Sasai
 */
public interface MediasetRepository extends JpaRepository<Mediaset, String>, JpaSpecificationExecutor<Mediaset> {
	// nop
}

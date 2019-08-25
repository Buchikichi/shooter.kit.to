package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.VisualView;

/**
 * VisualViewRepository.
 * @author H.Sasai
 */
public interface VisualViewRepository extends JpaRepository<VisualView, String>, JpaSpecificationExecutor<VisualView> {
	// nop
}

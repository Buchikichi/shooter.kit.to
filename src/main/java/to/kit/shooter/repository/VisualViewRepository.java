package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.VisualView;
import to.kit.shooter.entity.type.VisualType;

/**
 * VisualViewRepository.
 * @author H.Sasai
 */
public interface VisualViewRepository extends JpaRepository<VisualView, String>, JpaSpecificationExecutor<VisualView> {
	List<VisualView> findByMediasetIdAndVisualTypeOrderByName(String mediasetId, VisualType type);
}

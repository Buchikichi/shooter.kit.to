package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.MapVisual;

/**
 * @author H.Sasai
 */
public interface MapVisualRepository extends JpaRepository<MapVisual, String> {
	void deleteByMapId(String mapId);
}

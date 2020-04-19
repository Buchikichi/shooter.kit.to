package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.type.VisualType;

/**
 * Actors.
 * @author H.Sasai
 */
public interface ActorRepository extends JpaRepository<Actor, String>, JpaSpecificationExecutor<Actor> {
	/**
	 * Make a listing of actors.
	 * @param mediasetId Mediaset ID
	 * @param type Visual type
	 * @return listing of actors
	 */
	List<Actor> findByMediasetIdAndTypeOrderByClassName(String mediasetId, VisualType type);
	List<Actor> findByMediasetIdOrderByTypeAscClassName(String mediasetId);
}

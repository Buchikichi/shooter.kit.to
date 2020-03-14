package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import to.kit.shooter.entity.AudioView;
import to.kit.shooter.entity.type.AudioType;

/**
 * @author H.Sasai
 */
public interface AudioViewRepository extends JpaRepository<AudioView, String>, JpaSpecificationExecutor<AudioView> {
	List<AudioView> findByMediasetIdAndAudioTypeOrderByName(String mediasetId, AudioType type);
}

package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Audio;

/**
 * @author H.Sasai
 */
public interface AudioRepository extends JpaRepository<Audio, String> {
	Audio findByName(String name);
}

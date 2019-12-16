package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Scenario;

/**
 * @author H.Sasai
 */
public interface ScenarioRepository extends JpaRepository<Scenario, String> {
	void deleteByStageId(String stageId);
}

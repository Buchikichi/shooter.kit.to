package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Scenario;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.repository.ScenarioRepository;
import to.kit.shooter.repository.StageRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class StageService implements BasicServiceInterface<Stage> {
	@Autowired
	private StageRepository stageRepository;
	@Autowired
	private ScenarioRepository scenarioRepository;

	@Override
	public List<Stage> list(FilteringForm<Stage> form) {
		Sort sort = Sort.by(Order.desc("updated"), Order.asc("name"));
		return this.stageRepository.findAll(sort);
	}

	public Stage detail(String id) {
		return this.stageRepository.findById(id).get();
	}

	@Transactional
	public Stage saveMap(Stage stage) {
		String id = stage.getId();

		if (id == null || id.isEmpty()) {
			// New stage.
			return this.stageRepository.saveAndFlush(stage);
		}
		List<Scenario> scenarioList = stage.getScenarioList();

		this.scenarioRepository.deleteByStageId(id);
		for (Scenario scenario : scenarioList) {
			scenario.setStage(stage);
			this.scenarioRepository.saveAndFlush(scenario);
		}
		scenarioList.clear();
		Stage entity = this.stageRepository.findById(id).get();

		if (entity == null) {
			return null;
		}
		stage.setProduct(entity.getProduct());
		stage.setUpdated(new Date());
		return this.stageRepository.saveAndFlush(stage);
	}
}

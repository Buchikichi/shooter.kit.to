package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Stage;
import to.kit.shooter.repository.StageRepository;

@Service
public class StageService {
	@Autowired
	private StageRepository stageRepository;

	public List<Stage> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.stageRepository.findAll(sort);
	}

	public Stage detail(String id) {
		return this.stageRepository.findOne(id);
	}

	public Stage save(Stage stage) {
		String id = stage.getId();
		Stage entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.stageRepository.findOne(id);
		}
		if (entity != null) {
			stage.setId(entity.getId());
			stage.setCreated(entity.getCreated());
			stage.setUpdated(new Date());
		}
		return this.stageRepository.saveAndFlush(stage);
	}
}

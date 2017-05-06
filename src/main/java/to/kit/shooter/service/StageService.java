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
			// 画面で入力するものだけ更新
			entity.setAccess(stage.getAccess());
			entity.setName(stage.getName());
			entity.setDescription(stage.getDescription());
			entity.setTheme(stage.getTheme());
			entity.setBoss(stage.getBoss());
			entity.setBg1(stage.getBg1());
			entity.setBg2(stage.getBg2());
			entity.setBg3(stage.getBg3());
			entity.setFg1(stage.getFg1());
			entity.setFg2(stage.getFg2());
			entity.setFg3(stage.getFg3());
			entity.setUpdated(new Date());
			return this.stageRepository.saveAndFlush(entity);
		}
		return this.stageRepository.saveAndFlush(stage);
	}

	public Stage saveMap(Stage stage) {
		String id = stage.getId();

		if (id == null || id.isEmpty()) {
			return null;
		}
		Stage entity = this.stageRepository.findOne(id);

		if (entity == null) {
			return null;
		}
		entity.setMap(stage.getMap());
		entity.setBg1speed(stage.getBg1speed());
		entity.setBg1dir(stage.getBg1dir());
		entity.setBg1blink(stage.getBg1blink());
		entity.setBg2speed(stage.getBg2speed());
		entity.setBg2dir(stage.getBg2dir());
		entity.setBg2blink(stage.getBg2blink());
		entity.setBg3speed(stage.getBg3speed());
		entity.setBg3dir(stage.getBg3dir());
		entity.setBg3blink(stage.getBg3blink());
		entity.setFg1speed(stage.getFg1speed());
		entity.setFg1dir(stage.getFg1dir());
		entity.setFg1blink(stage.getFg1blink());
		entity.setFg2speed(stage.getFg2speed());
		entity.setFg2dir(stage.getFg2dir());
		entity.setFg2blink(stage.getFg2blink());
		entity.setFg3speed(stage.getFg3speed());
		entity.setFg3dir(stage.getFg3dir());
		entity.setFg3blink(stage.getFg3blink());
		entity.setUpdated(new Date());
		return this.stageRepository.saveAndFlush(entity);
	}
}

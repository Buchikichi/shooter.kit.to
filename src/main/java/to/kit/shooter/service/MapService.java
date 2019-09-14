package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Map;
import to.kit.shooter.repository.MapRepository;

@Service
public class MapService {
	@Autowired
	private MapRepository mapRepository;

	public List<Map> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.mapRepository.findAll(sort);
	}

	public Map detail(String id) {
		return this.mapRepository.findOne(id);
	}

	public Map save(Map map) {
		String id = map.getId();
		Map entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.mapRepository.findOne(id);
		}
		if (entity != null) {
			// 画面で入力するものだけ更新
			entity.setAccess(map.getAccess());
			entity.setName(map.getName());
			entity.setDescription(map.getDescription());
			entity.setTheme(map.getTheme());
			entity.setBoss(map.getBoss());
			entity.setBg1(map.getBg1());
			entity.setBg2(map.getBg2());
			entity.setBg3(map.getBg3());
			entity.setFg1(map.getFg1());
			entity.setFg2(map.getFg2());
			entity.setFg3(map.getFg3());
			entity.setUpdated(new Date());
			return this.mapRepository.saveAndFlush(entity);
		}
		return this.mapRepository.saveAndFlush(map);
	}

	public Map saveMap(Map map) {
		String id = map.getId();

		if (id == null || id.isEmpty()) {
			return null;
		}
		Map entity = this.mapRepository.findOne(id);

		if (entity == null) {
			return null;
		}
		entity.setMap(map.getMap());
		entity.setBg1speed(map.getBg1speed());
		entity.setBg1dir(map.getBg1dir());
		entity.setBg1blink(map.getBg1blink());
		entity.setBg2speed(map.getBg2speed());
		entity.setBg2dir(map.getBg2dir());
		entity.setBg2blink(map.getBg2blink());
		entity.setBg3speed(map.getBg3speed());
		entity.setBg3dir(map.getBg3dir());
		entity.setBg3blink(map.getBg3blink());
		entity.setFg1speed(map.getFg1speed());
		entity.setFg1dir(map.getFg1dir());
		entity.setFg1blink(map.getFg1blink());
		entity.setFg2speed(map.getFg2speed());
		entity.setFg2dir(map.getFg2dir());
		entity.setFg2blink(map.getFg2blink());
		entity.setFg3speed(map.getFg3speed());
		entity.setFg3dir(map.getFg3dir());
		entity.setFg3blink(map.getFg3blink());
		entity.setUpdated(new Date());
		return this.mapRepository.saveAndFlush(entity);
	}
}

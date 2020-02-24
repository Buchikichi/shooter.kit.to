package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Map;
import to.kit.shooter.entity.MapVisual;
import to.kit.shooter.repository.MapRepository;
import to.kit.shooter.repository.MapVisualRepository;

@Service
public class MapService {
	@Autowired
	private MapRepository mapRepository;
	@Autowired
	private MapVisualRepository mapVisualRepository;

	public List<Map> list(String mediasetId) {
		Sort sort = Sort.by("name");
		Specification<Map> spec = Specification.where((root, query, cb) -> {
			return cb.equal(root.get("mediaset").get("id"), mediasetId);
		});
		return this.mapRepository.findAll(spec, sort);
	}

	public Map detail(String id) {
		return this.mapRepository.findById(id).get();
	}

	public Map save0(Map map) {
		String id = map.getId();
		Map entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.mapRepository.findById(id).get();
		}
		if (entity != null) {
			// 画面で入力するものだけ更新
			entity.setName(map.getName());
			entity.setDescription(map.getDescription());
			entity.setUpdated(new Date());
			return this.mapRepository.saveAndFlush(entity);
		}
		return this.mapRepository.saveAndFlush(map);
	}

	@Transactional
	public Map save(Map map) {
		String id = map.getId();
		Map saved;

		if (id == null || id.isEmpty()) {
			// Create
			saved = this.mapRepository.saveAndFlush(map);
		} else {
			// Update
			Map entity = this.mapRepository.findById(id).get();

			if (entity == null) {
				return null;
			}
//			entity.setName(map.getName());
//			entity.setMap(map.getMap());
//			entity.setMainSeq(map.getMainSeq());
//			entity.setBrickSize(map.getBrickSize());
//			entity.setUpdated(new Date());
			map.setUpdated(new Date());
			saved = this.mapRepository.saveAndFlush(map);
		}
		// MapVisual
		this.mapVisualRepository.deleteByMapId(id);
		for (MapVisual mapVisual : map.getMapVisualList()) {
			mapVisual.setMap(saved);
			this.mapVisualRepository.saveAndFlush(mapVisual);
		}
		return saved;
	}
}

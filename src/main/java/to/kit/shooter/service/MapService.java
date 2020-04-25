package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Map;
import to.kit.shooter.entity.MapVisual;
import to.kit.shooter.repository.MapRepository;
import to.kit.shooter.repository.MapVisualRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class MapService implements BasicServiceInterface<Map> {
	@Autowired
	private MapRepository mapRepository;
	@Autowired
	private MapVisualRepository mapVisualRepository;

	@Override
	public List<Map> list(FilteringForm<Map> form) {
		String mediasetId = form.getCriteria().getMediasetId();

		return this.mapRepository.findByMediasetIdOrderByName(mediasetId);
	}

	@Override
	public Map select(String id) {
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
			entity.setUpdated(new Date());
			return this.mapRepository.saveAndFlush(entity);
		}
		return this.mapRepository.saveAndFlush(map);
	}

	@Transactional
	@Override
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

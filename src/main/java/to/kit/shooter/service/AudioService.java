package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioShort;
import to.kit.shooter.repository.AudioRepository;
import to.kit.shooter.repository.AudioShortRepository;

@Service
public class AudioService {
	@Autowired
	private AudioRepository audioRepository;
	@Autowired
	private AudioShortRepository audioShortRepository;

	public List<AudioShort> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.audioShortRepository.findAll(sort);
	}

	public Audio detail(String id) {
		return this.audioRepository.findOne(id);
	}

	public Audio save(Audio entity) {
		String id = entity.getId();
		Audio prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.audioRepository.findOne(id);
			if (prev == null) {
				entity.setId(null);
			} else {
				String data = entity.getData();

				if (data == null || data.isEmpty()) {
					entity.setData(prev.getData());
				}
			}
		}
//		entity.setCreated(prev.getCreated());
		entity.setUpdated(new Date());
		return this.audioRepository.saveAndFlush(entity);
	}
}

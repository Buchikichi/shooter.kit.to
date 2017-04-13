package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.repository.AudioRepository;

@Service
public class AudioService {
	@Autowired
	private AudioRepository audioRepository;

	public List<Audio> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.audioRepository.findAll(sort);
	}

	public Audio detail(String id) {
		return this.audioRepository.findOne(id);
	}

	public Audio save(Audio audio) {
		String id = audio.getId();
		Audio entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.audioRepository.findOne(id);
		}
		if (entity != null) {
			audio.setId(entity.getId());
			audio.setCreated(entity.getCreated());
			audio.setUpdated(new Date());
		}
		return this.audioRepository.saveAndFlush(audio);
	}
}

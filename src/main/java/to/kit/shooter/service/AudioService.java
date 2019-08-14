package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.domain.Specifications;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioView;
import to.kit.shooter.repository.AudioRepository;
import to.kit.shooter.repository.AudioViewRepository;

@Service
public class AudioService {
	@Autowired
	private AudioRepository audioRepository;
	@Autowired
	private AudioViewRepository audioViewRepository;

	public List<AudioView> list(String keyword, int type) {
		Sort sort = new Sort(new Order(Direction.ASC, "type"), new Order(Direction.ASC, "name"));
		Specification<AudioView> nameSpec = Specifications.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		Specification<AudioView> spec = Specifications.where(nameSpec).and((root, query, cb) -> {
			return type == 0 ? null : cb.equal(root.get("type"), Integer.valueOf(type));
		});
		return this.audioViewRepository.findAll(spec, sort);
	}

	public AudioView detail(String id) {
		return this.audioViewRepository.findOne(id);
	}

	public Audio findOne(String id) {
		return this.audioRepository.findOne(id);
	}

	public Audio findByName(String name) {
		return this.audioRepository.findByName(name);
	}

	public Audio save(Audio entity) {
		String id = entity.getId();
		Audio prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.audioRepository.findOne(id);
		}
		if (prev != null) {
			String webm = entity.getWebm();
			String audio = entity.getAudio();

			if (webm == null || webm.isEmpty()) {
				entity.setWebm(prev.getWebm());
			}
			if (audio == null || audio.isEmpty()) {
				entity.setAudio(prev.getAudio());
			}
			entity.setId(prev.getId());
			entity.setCreated(prev.getCreated());
			entity.setUpdated(new Date());
		}
		return this.audioRepository.saveAndFlush(entity);
	}
}

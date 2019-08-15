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
import to.kit.shooter.entity.AudioSet;
import to.kit.shooter.repository.AudioRepository;
import to.kit.shooter.repository.AudioSetRepository;

@Service
public class AudioSetService {
	@Autowired
	private AudioRepository audioRepository;
	@Autowired
	private AudioSetRepository audioSetRepository;

	public List<AudioSet> list(String keyword) {
		Sort sort = new Sort(new Order(Direction.ASC, "updated"), new Order(Direction.ASC, "name"));
		Specification<AudioSet> nameSpec = Specifications.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		return this.audioSetRepository.findAll(nameSpec, sort);
	}

	public AudioSet detail(String id) {
		return this.audioSetRepository.findOne(id);
	}

	public AudioSet save(AudioSet entity) {
		String id = entity.getId();
		Audio prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.audioRepository.findOne(id);
		}
		if (prev != null) {
//			String webm = entity.getWebm();
//			String audio = entity.getAudio();
//
//			if (webm == null || webm.isEmpty()) {
//				entity.setWebm(prev.getWebm());
//			}
//			if (audio == null || audio.isEmpty()) {
//				entity.setAudio(prev.getAudio());
//			}
			entity.setId(prev.getId());
			entity.setCreated(prev.getCreated());
			entity.setUpdated(new Date());
		}
		return this.audioSetRepository.saveAndFlush(entity);
	}
}

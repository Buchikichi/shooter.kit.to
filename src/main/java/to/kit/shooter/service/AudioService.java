package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

	public List<AudioView> list(String mediasetId, int type) {
		Sort sort = Sort.by("audioType", "audioSeq", "name");
		Specification<AudioView> mediasetIdSpec = Specification.where((root, query, cb) -> {
			return cb.like(root.get("mediaset").get("id"), '%' + mediasetId);
		});
		Specification<AudioView> spec = Specification.where(mediasetIdSpec).and((root, query, cb) -> {
			return type == -1 ? null : cb.equal(root.get("audioType"), Integer.valueOf(type));
		});
		return this.audioViewRepository.findAll(spec, sort);
	}

	public AudioView detail(String id) {
		return this.audioViewRepository.findById(id).get();
	}

	public Audio findOne(String id) {
		return this.audioRepository.findById(id).get();
	}

	public Audio findByName(String name) {
		return this.audioRepository.findByName(name);
	}

	public Audio save(Audio entity) {
		String id = entity.getId();
		Audio prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.audioRepository.findById(id).get();
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

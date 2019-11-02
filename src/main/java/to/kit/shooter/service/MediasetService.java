package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.repository.MediasetRepository;

@Service
public class MediasetService {
	@Autowired
	private MediasetRepository mediasetRepository;

	public List<Mediaset> list(String keyword) {
		Sort sort = Sort.by("updated", "name");
		Specification<Mediaset> nameSpec = Specification.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		return this.mediasetRepository.findAll(nameSpec, sort);
	}

	public Mediaset detail(String id) {
		return this.mediasetRepository.findById(id).get();
	}

	public Mediaset save(Mediaset entity) {
		String id = entity.getId();
		Mediaset prev = this.mediasetRepository.findById(id).get();

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
		return this.mediasetRepository.saveAndFlush(entity);
	}
}

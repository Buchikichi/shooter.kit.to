package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.repository.MediasetRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class MediasetService implements BasicServiceInterface<Mediaset> {
	@Autowired
	private MediasetRepository mediasetRepository;

	@Override
	public List<Mediaset> list(FilteringForm<Mediaset> form) {
		String keyword = "";
		Sort sort = Sort.by("updated", "name");
		Specification<Mediaset> nameSpec = Specification.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		return this.mediasetRepository.findAll(nameSpec, sort);
	}

	public List<Mediaset> list() {
		return list(new FilteringForm<>());
	}

	@Override
	public Mediaset select(String id) {
		return this.mediasetRepository.findById(id).get();
	}

	@Override
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

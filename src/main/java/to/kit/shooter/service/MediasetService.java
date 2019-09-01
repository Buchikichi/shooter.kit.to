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

import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.repository.MediasetRepository;

@Service
public class MediasetService {
	@Autowired
	private MediasetRepository mediasetRepository;

	public List<Mediaset> list(String keyword) {
		Sort sort = new Sort(new Order(Direction.ASC, "updated"), new Order(Direction.ASC, "name"));
		Specification<Mediaset> nameSpec = Specifications.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		return this.mediasetRepository.findAll(nameSpec, sort);
	}

	public Mediaset detail(String id) {
		return this.mediasetRepository.findOne(id);
	}

	public Mediaset save(Mediaset entity) {
		String id = entity.getId();
		Mediaset prev = this.mediasetRepository.findOne(id);

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

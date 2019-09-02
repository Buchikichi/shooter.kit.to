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

import to.kit.shooter.entity.Visual;
import to.kit.shooter.entity.VisualView;
import to.kit.shooter.repository.VisualRepository;
import to.kit.shooter.repository.VisualViewRepository;

@Service
public class VisualService {
	@Autowired
	private VisualRepository visualRepository;
	@Autowired
	private VisualViewRepository visualViewRepository;

	public List<VisualView> list(String mediasetId, int type) {
		Sort sort = new Sort(new Order(Direction.ASC, "visualType"), new Order(Direction.ASC, "visualSeq"), new Order(Direction.ASC, "name"));
		Specification<VisualView> nameSpec = Specifications.where((root, query, cb) -> {
			return cb.like(root.get("mediasetId"), '%' + mediasetId);
		});
		Specification<VisualView> spec = Specifications.where(nameSpec).and((root, query, cb) -> {
			return type == -1 ? null : cb.equal(root.get("visualType"), Integer.valueOf(type));
		});
		return this.visualViewRepository.findAll(spec, sort);
	}

	public VisualView detail(String id) {
		return this.visualViewRepository.findOne(id);
	}

	public Visual findOne(String id) {
		return this.visualRepository.findOne(id);
	}

	public Visual findByName(String name) {
		return this.visualRepository.findByName(name);
	}

	public Visual save(Visual entity) {
		String id = entity.getId();
		Visual prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.visualRepository.findOne(id);
			if (prev == null) {
				entity.setId(null);
			} else {
				String image = entity.getImage();

				if (image == null || image.isEmpty()) {
					entity.setImage(prev.getImage());
					entity.setHash(prev.getHash());
					entity.setContentType(prev.getContentType());
				}
			}
		}
		entity.setUpdated(new Date());
		return this.visualRepository.saveAndFlush(entity);
	}
}

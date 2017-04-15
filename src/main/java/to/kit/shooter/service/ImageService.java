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

import to.kit.shooter.entity.Image;
import to.kit.shooter.entity.ImageShort;
import to.kit.shooter.repository.ImageRepository;
import to.kit.shooter.repository.ImageShortRepository;

@Service
public class ImageService {
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private ImageShortRepository imageShortRepository;

	public Specification<ImageShort> nameContains(String name) {
		if (name == null) {
			return null;
		}
		Specification<ImageShort> spec = (root, query, cb) -> {
			return cb.like(root.get("name"), "%" + name + "%");
		};
		return spec;
	}

	public List<ImageShort> list(String name, int type) {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		Specification<ImageShort> nameSpec = Specifications.where(nameContains(name));
		Specification<ImageShort> spec = Specifications.where(nameContains(name)).and((root, query, cb) -> {
			return type == 0 ? null : cb.equal(root.get("type"), Integer.valueOf(type));
		});
		return this.imageShortRepository.findAll(spec, sort);
	}

	public Image detail(String id) {
		return this.imageRepository.findOne(id);
	}

	public Image save(Image entity) {
		String id = entity.getId();
		Image prev = null;

		if (id != null && !id.isEmpty()) {
			prev = this.imageRepository.findOne(id);
			if (prev == null) {
				entity.setId(null);
			} else {
				String image = entity.getImage();

				if (image == null || image.isEmpty()) {
					entity.setImage(prev.getImage());
				}
			}
		}
		entity.setUpdated(new Date());
		return this.imageRepository.saveAndFlush(entity);
	}
}

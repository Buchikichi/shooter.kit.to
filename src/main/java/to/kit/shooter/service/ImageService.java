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
import to.kit.shooter.entity.ImageView;
import to.kit.shooter.repository.ImageRepository;
import to.kit.shooter.repository.ImageViewRepository;

@Service
public class ImageService {
	@Autowired
	private ImageRepository imageRepository;
	@Autowired
	private ImageViewRepository imageViewRepository;

	public List<ImageView> list(String keyword, int type) {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		Specification<ImageView> nameSpec = Specifications.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		Specification<ImageView> spec = Specifications.where(nameSpec).and((root, query, cb) -> {
			return cb.equal(root.get("type"), Integer.valueOf(type));
		});
		return this.imageViewRepository.findAll(spec, sort);
	}

	public ImageView detail(String id) {
		return this.imageViewRepository.findOne(id);
	}

	public Image findOne(String id) {
		return this.imageRepository.findOne(id);
	}

	public Image findByName(String name) {
		return this.imageRepository.findByName(name);
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

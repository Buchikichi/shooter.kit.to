package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
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

	public List<ImageShort> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));

		return this.imageShortRepository.findAll(sort);
	}

	public Image detail(String id) {
		return this.imageRepository.findOne(id);
	}

	public Image save(Image stage) {
		String id = stage.getId();
		Image entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.imageRepository.findOne(id);
		}
		if (entity == null) {
			entity = stage;
		}
		return this.imageRepository.saveAndFlush(entity);
	}
}

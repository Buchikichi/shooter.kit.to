package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.ActorVisual;
import to.kit.shooter.repository.ActorVisualRepository;

@Service
public class ActorVisualService {
	@Autowired
	private ActorVisualRepository repository;

	/**
	 * 一覧取得.
	 * @param keyword キーワード
	 * @param type 種類
	 * @return 一覧
	 */
	public List<ActorVisual> list(String keyword, int type) {
		Sort sort = Sort.by(Order.desc("updated"), Order.by("name"));
		Specification<ActorVisual> nameSpec = Specification.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		Specification<ActorVisual> spec = Specification.where(nameSpec).and((root, query, cb) -> {
			return cb.equal(root.get("type"), Integer.valueOf(type));
		});
		return this.repository.findAll(spec, sort);
	}

	public ActorVisual detail(String id) {
		return this.repository.findById(id).get();
	}

	public ActorVisual save(ActorVisual actor) {
		String id = actor.getId();
		ActorVisual entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.repository.findById(id).get();
		}
		if (entity != null) {
			actor.setId(entity.getId());
			actor.setCreated(entity.getCreated());
			actor.setUpdated(new Date());
		}
		return this.repository.saveAndFlush(actor);
	}
}

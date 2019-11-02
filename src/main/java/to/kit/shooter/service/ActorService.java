package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.repository.ActorRepository;

@Service
public class ActorService {
	@Autowired
	private ActorRepository actorRepository;

	/**
	 * 一覧取得.
	 * @param keyword キーワード
	 * @param type 種類
	 * @return 一覧
	 */
	public List<Actor> list(String keyword, int type) {
		Sort sort = Sort.by(Order.desc("updated"), Order.by("name"));
		Specification<Actor> nameSpec = Specification.where((root, query, cb) -> {
			return cb.like(root.get("name"), "%" + keyword + "%");
		});
		Specification<Actor> spec = Specification.where(nameSpec).and((root, query, cb) -> {
			return cb.equal(root.get("type"), Integer.valueOf(type));
		});
		return this.actorRepository.findAll(spec, sort);
	}

	public Actor detail(String id) {
		return this.actorRepository.findById(id).get();
	}

	public Actor save(Actor actor) {
		String id = actor.getId();
		Actor entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.actorRepository.findById(id).get();
		}
		if (entity != null) {
			actor.setId(entity.getId());
			actor.setCreated(entity.getCreated());
			actor.setUpdated(new Date());
		}
		return this.actorRepository.saveAndFlush(actor);
	}
}

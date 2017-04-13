package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.repository.ActorRepository;

@Service
public class ActorService {
	@Autowired
	private ActorRepository actorRepository;

	public List<Actor> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.actorRepository.findAll(sort);
	}

	public Actor detail(String id) {
		return this.actorRepository.findOne(id);
	}

	public Actor save(Actor actor) {
		String id = actor.getId();
		Actor entity = null;

		if (id != null && !id.isEmpty()) {
			entity = this.actorRepository.findOne(id);
		}
		if (entity != null) {
			actor.setId(entity.getId());
			actor.setCreated(entity.getCreated());
			actor.setUpdated(new Date());
		}
		return this.actorRepository.saveAndFlush(actor);
	}
}

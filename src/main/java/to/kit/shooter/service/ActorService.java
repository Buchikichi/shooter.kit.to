package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.repository.ActorRepository;

@Service
public class ActorService {
	@Autowired
	private ActorRepository repository;

	public List<Actor> list(Actor criteria) {
		String productId = criteria.getProduct().getId();

		return this.repository.findByProductIdAndTypeOrderByClassName(productId, criteria.getType());
	}

	public Actor detail(String id) {
		return this.repository.findById(id).get();
	}

	public Actor save(Actor actor) {
		return actor;
	}
}

package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.repository.ActorRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class ActorService implements BasicServiceInterface<Actor> {
	@Autowired
	private ActorRepository repository;

	@Override
	public List<Actor> list(FilteringForm<Actor> form) {
		Actor criteria = form.getCriteria();
		String productId = criteria.getProduct().getId();

		return this.repository.findByProductIdAndTypeOrderByClassName(productId, criteria.getType());
	}

	@Override
	public Actor select(String id) {
		return this.repository.findById(id).get();
	}

	public Actor save(Actor actor) {
		return actor;
	}
}

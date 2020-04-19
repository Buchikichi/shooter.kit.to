package to.kit.shooter.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.type.VisualType;
import to.kit.shooter.repository.ActorRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class ActorService implements BasicServiceInterface<Actor> {
	@Autowired
	private ActorRepository repository;

	@Override
	public List<Actor> list(FilteringForm<Actor> form) {
		Actor criteria = form.getCriteria();
		VisualType type = criteria.getType();
		String mediasetId = criteria.getMediaset().getId();

		if (type == VisualType.None) {
			return this.repository.findByMediasetIdOrderByTypeAscClassName(mediasetId);
		}
		return this.repository.findByMediasetIdAndTypeOrderByClassName(mediasetId, type);
	}

	@Override
	public Actor select(String id) {
		return this.repository.findById(id).get();
	}

	@Override
	@Transactional
	public Actor save(Actor actor) {
		return this.repository.saveAndFlush(actor);
	}
}

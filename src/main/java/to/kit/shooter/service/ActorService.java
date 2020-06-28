package to.kit.shooter.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.ActorVisual;
import to.kit.shooter.entity.Scenario;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.VisualType;
import to.kit.shooter.repository.ActorRepository;
import to.kit.shooter.repository.ActorVisualRepository;
import to.kit.shooter.web.form.ActorRec;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class ActorService implements BasicServiceInterface<Actor> {
	@Autowired
	private ActorRepository repository;
	@Autowired
	private ActorVisualRepository actorVisualRepository;
	@Autowired
	private ProductService productService;

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

	public List<ActorRec> listWithReferrer(FilteringForm<Actor> form) {
		Actor criteria = form.getCriteria();
		String mediasetId = criteria.getMediaset().getId();
		Map<SeqType, List<Scenario>> scenarioMap = this.productService.makeScenarioMap(mediasetId);

		return list(form).stream().map(a -> {
			SeqType key = a.getSeq();
			ActorRec rec = ActorRec.create(a);

			if (scenarioMap.containsKey(key)) {
				rec.setReferrer(scenarioMap.get(key).size());
			}
			return rec;
		}).collect(Collectors.toList());
	}

	@Override
	public Actor select(String id) {
		return this.repository.findById(id).get();
	}

	@Override
	@Transactional
	public Actor save(Actor actor) {
		if (actor.getId() == null) {
			List<ActorVisual> actorVisualList = actor.getActorVisualList();
			List<ActorVisual> newList = new ArrayList<>(actorVisualList);
			actorVisualList.clear();
			Actor newActor = this.repository.saveAndFlush(actor);
			newActor.getActorVisualList().addAll(newList);
			for (ActorVisual actorVisual : newList) {
				actorVisual.setActor(newActor);
				this.actorVisualRepository.saveAndFlush(actorVisual);
			}
			return newActor;
		}
		return this.repository.saveAndFlush(actor);
	}
}

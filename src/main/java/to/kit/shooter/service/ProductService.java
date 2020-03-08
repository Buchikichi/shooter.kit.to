package to.kit.shooter.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.apache.commons.codec.digest.MurmurHash2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.repository.ActorRepository;
import to.kit.shooter.repository.ProductRepository;
import to.kit.shooter.repository.StageRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StageRepository stageRepository;
	@Autowired
	private ActorRepository productActorRepository;

	public List<Product> list() {
		Sort sort = Sort.by(Order.desc("updated"), Order.asc("name"));
		List<Product> list = this.productRepository.findAll(sort);

		for (Product entity : list) {
			entity.getStageList().clear();
		}
		return list;
	}

	public Product detail(String id) {
		Product product = this.productRepository.findById(id).get();

		return product;
	}

	public void deleteUnusedStage(Product product) {
		List<String> valid = product.getStageList().stream()
				.map(Stage::getId).collect(Collectors.toList());
		List<Stage> list = this.stageRepository.findByProductId(product.getId());

		for (Stage stage : list) {
			if (!valid.contains(stage.getId())) {
				this.stageRepository.delete(stage);
			}
		}
	}

	private void prepare(Product product) {
		for (Stage rec : product.getStageList()) {
			rec.setProduct(product);
			rec.setUpdated(new Date());
		}
		for (Actor actor : product.getActorList()) {
			actor.setProduct(product);
			actor.setUpdated(new Date());
			actor.getActorVisualList().clear();
			// TODO: remove
//			if (0 <= actor.getSeq() && actor.getSeq() < 256) {
//				String text = UUID.randomUUID().toString();
//
//				actor.setSeq(MurmurHash2.hash64(text));
//			}
		}
		product.getScoreList().clear();
	}

	private void deleteActorByProductId(String productId) {
		List<Actor> list = this.productActorRepository.findByProductId(productId);

		this.productActorRepository.deleteInBatch(list);
	}

	public Product save(Product entity) {
		String id = entity.getId();

		if (!this.productRepository.existsById(id)) {
			id = null;
			entity.setId(null);
		}
//		if (id != null && !id.isEmpty()) {
//			deleteActorByProductId(id);
//		}

		prepare(entity);

//		List<Actor> actorList = entity.getActorList();
//		actorList.removeIf(a -> {
//			return a.getActor() == null;
//		});
		entity.setUpdated(new Date());
		return this.productRepository.saveAndFlush(entity);
	}

	/**
	 * プレイ回数加算.
	 * @param id プロダクトID
	 */
	public void increase(String id) {
		Product product = this.productRepository.findById(id).get();

		if (product != null) {
			int next = product.getCount() + 1;

			product.setCount(next);
			this.productRepository.save(product);
		}
	}
}

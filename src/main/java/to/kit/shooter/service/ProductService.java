package to.kit.shooter.service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.ProductActor;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.entity.Scores;
import to.kit.shooter.repository.ProductActorRepository;
import to.kit.shooter.repository.StageRepository;
import to.kit.shooter.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StageRepository stageRepository;
	@Autowired
	private ProductActorRepository productActorRepository;

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
		List<Stage> stageList = product.getStageList();
		List<ProductActor> actorList = product.getActorList();
		List<Scores> scoreList = product.getScoreList();

		stageList.sort((a, b) -> a.getSeq() - b.getSeq());
		actorList.sort((a, b) -> a.getSeq() - b.getSeq());
		scoreList.sort((a, b) -> b.getScore() - a.getScore());
		return product;
	}

	public void deleteUnusedStage(Product product) {
		Set<String> valid = new HashSet<>();
		List<Stage> list = this.stageRepository.findByProductId(product.getId());

		for (Stage stage : product.getStageList()) {
			valid.add(stage.getId());
		}
		for (Stage stage : list) {
			if (!valid.contains(stage.getId())) {
				this.stageRepository.delete(stage);
			}
		}
	}

	private void prepareStage(Product product) {
		for (Stage stage : product.getStageList()) {
			String id = stage.getId();

			if (id != null) {
				Stage prev = this.stageRepository.findById(id).get();

				if (prev != null) {
					stage.setMap(prev.getMap());
					stage.setUpdated(new Date());
				}
			}
			stage.setProduct(product);
		}
	}

	private void deleteActorByProductId(String productId) {
		List<ProductActor> list = this.productActorRepository.findByProductId(productId);

		this.productActorRepository.deleteInBatch(list);
	}

	public Product save(Product entity) {
		String id = entity.getId();

		if (!this.productRepository.existsById(id)) {
			id = null;
			entity.setId(null);
		}
		if (id != null && !id.isEmpty()) {
			deleteActorByProductId(id);
		}
		prepareStage(entity);
		List<ProductActor> actorList = entity.getActorList();
		actorList.removeIf(a -> {
			return a.getActor() == null;
		});
		for (ProductActor actor : actorList) {
			actor.setProduct(entity);
			actor.setUpdated(new Date());
		}
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

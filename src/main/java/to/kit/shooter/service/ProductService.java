package to.kit.shooter.service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.repository.ProductRepository;
import to.kit.shooter.repository.StageRepository;
import to.kit.shooter.web.form.FilteringForm;

@Service
public class ProductService implements BasicServiceInterface<Product> {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private StageRepository stageRepository;

	@Override
	public List<Product> list(FilteringForm<Product> form) {
		Sort sort = Sort.by(Order.desc("updated"), Order.asc("name"));
		List<Product> list = this.productRepository.findAll(sort);

		for (Product entity : list) {
			entity.getStageList().clear();
		}
		return list;
	}

	@Override
	public Product select(String id) {
		return this.productRepository.findById(id).get();
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
		product.getScoreList().clear();
	}

	@Transactional
	@Override
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

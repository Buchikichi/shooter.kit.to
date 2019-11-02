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
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.entity.Scores;
import to.kit.shooter.repository.ProductActorRepository;
import to.kit.shooter.repository.ProductDetailRepository;
import to.kit.shooter.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private ProductDetailRepository productDetailRepository;
	@Autowired
	private ProductActorRepository productActorRepository;

	public List<Product> list() {
		Sort sort = Sort.by(Order.desc("updated"), Order.asc("name"));
		List<Product> list = this.productRepository.findAll(sort);

		for (Product entity : list) {
			entity.getDetailList().clear();
		}
		return list;
	}

	public Product detail(String id) {
		Product product = this.productRepository.findById(id).get();
		List<ProductDetail> detailList = product.getDetailList();
		List<ProductActor> actorList = product.getActorList();
		List<Scores> scoreList = product.getScoreList();

		detailList.sort((a, b) -> a.getSeq() - b.getSeq());
		actorList.sort((a, b) -> a.getSeq() - b.getSeq());
		scoreList.sort((a, b) -> b.getScore() - a.getScore());
		return product;
	}

	public void deleteUnusedStage(Product product) {
		Set<String> valid = new HashSet<>();
		List<ProductDetail> list = this.productDetailRepository.findByProductId(product.getId());

		for (ProductDetail detail : product.getDetailList()) {
			valid.add(detail.getId());
		}
		for (ProductDetail detail : list) {
			if (!valid.contains(detail.getId())) {
				this.productDetailRepository.delete(detail);
			}
		}
	}

	private void prepareProductDetail(Product product) {
		for (ProductDetail detail : product.getDetailList()) {
			String id = detail.getId();

			if (id != null) {
				ProductDetail prev = this.productDetailRepository.findById(id).get();

				if (prev != null) {
					detail.setMap(prev.getMap());
					detail.setUpdated(new Date());
				}
			}
			detail.setProduct(product);
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
		prepareProductDetail(entity);
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

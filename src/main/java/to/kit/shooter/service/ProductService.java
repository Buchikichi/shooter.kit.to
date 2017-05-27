package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.ProductActor;
import to.kit.shooter.entity.ProductDetail;
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
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		List<Product> list = this.productRepository.findAll(sort);

		for (Product entity : list) {
			entity.getDetailList().clear();
		}
		return list;
	}

	public Product detail(String id) {
		Product product = this.productRepository.findOne(id);
		List<ProductDetail> detailList = product.getDetailList();
		List<ProductActor> actorList = product.getActorList();

		detailList.sort((a, b) -> a.getSeq() - b.getSeq());
		actorList.sort((a, b) -> a.getSeq() - b.getSeq());
		return product;
	}

	public void deleteDetailByProductId(String productId) {
		List<ProductDetail> list = this.productDetailRepository.findByProductId(productId);

		this.productDetailRepository.deleteInBatch(list);
	}

	private void deleteActorByProductId(String productId) {
		List<ProductActor> list = this.productActorRepository.findByProductId(productId);

		this.productActorRepository.deleteInBatch(list);
	}

	public Product save(Product entity) {
		String id = entity.getId();

		if (!this.productRepository.exists(id)) {
			id = null;
			entity.setId(null);
		}
		if (id != null && !id.isEmpty()) {
			deleteDetailByProductId(id);
			deleteActorByProductId(id);
		}
		for (ProductDetail detail : entity.getDetailList()) {
			detail.setProduct(entity);
			detail.setUpdated(new Date());
		}
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
}

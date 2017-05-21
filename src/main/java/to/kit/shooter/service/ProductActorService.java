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
import to.kit.shooter.repository.ProductActorRepository;

@Service
public class ProductActorService {
	@Autowired
	private ProductActorRepository productActorRepository;

	public List<ProductActor> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.productActorRepository.findAll(sort);
	}

	public ProductActor detail(String id) {
		return this.productActorRepository.findOne(id);
	}

	private void deleteByProductId(String productId) {
		List<ProductActor> list = this.productActorRepository.findByProductId(productId);

		this.productActorRepository.deleteInBatch(list);
	}

	public boolean save(Product product, List<ProductActor> list) {
		boolean result = true;

		deleteByProductId(product.getId());
		for (ProductActor entity : list) {
			entity.setProduct(product);
			entity.setUpdated(new Date());
			ProductActor productActor = this.productActorRepository.saveAndFlush(entity);
			if (productActor == null) {
				result = false;
				break;
			}
		}
		return result;
	}
}

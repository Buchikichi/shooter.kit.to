package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

	public List<Product> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.productRepository.findAll(sort);
	}

	public Product detail(String id) {
		return this.productRepository.findOne(id);
	}

	public Product save(Product product) {
		String id = product.getId();

		if (!this.productRepository.exists(id)) {
			product.setId(null);
		}
		return this.productRepository.saveAndFlush(product);
	}
}

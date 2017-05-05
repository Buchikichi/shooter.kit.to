package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.repository.ProductRepository;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepository;

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

		detailList.sort((a, b) -> a.getSeq() - b.getSeq());
		return product;
	}

	public Product save(Product entity) {
		String id = entity.getId();

		if (!this.productRepository.exists(id)) {
			entity.setId(null);
		}
		entity.setUpdated(new Date());
		return this.productRepository.saveAndFlush(entity);
	}
}

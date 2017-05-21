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
import to.kit.shooter.repository.ProductDetailRepository;

@Service
public class ProductDetailService {
	@Autowired
	private ProductDetailRepository productDetailRepository;

	public List<ProductDetail> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.productDetailRepository.findAll(sort);
	}

	public ProductDetail detail(String id) {
		return this.productDetailRepository.findOne(id);
	}

	private void deleteByProductId(String productId) {
		List<ProductDetail> list = this.productDetailRepository.findByProductId(productId);

		this.productDetailRepository.deleteInBatch(list);
	}

	public boolean save(Product product, List<ProductDetail> list) {
		boolean result = true;

		deleteByProductId(product.getId());
		for (ProductDetail entity : list) {
			entity.setProduct(product);
			entity.setUpdated(new Date());
			ProductDetail productDetail = this.productDetailRepository.saveAndFlush(entity);
			if (productDetail == null) {
				result = false;
				break;
			}
		}
		return result;
	}

	public ProductDetail saveMap(ProductDetail detail) {
		String id = detail.getId();

		if (id == null || id.isEmpty()) {
			return null;
		}
		ProductDetail entity = this.productDetailRepository.findOne(id);

		if (entity == null) {
			return null;
		}
		entity.setMap(detail.getMap());
		entity.setUpdated(new Date());
		return this.productDetailRepository.saveAndFlush(entity);
	}
}

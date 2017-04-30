package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.repository.ProductDetailRepository;

@Service
public class ProductDetailService {
	@Autowired
	private ProductDetailRepository productDetailRepository;

	private void deleteByProductId(String productId) {
		List<ProductDetail> list = this.productDetailRepository.findByProductId(productId);

		this.productDetailRepository.deleteInBatch(list);
	}

	public boolean save(Product product, List<ProductDetail> list) {
		boolean result = true;
		String productId = product.getId();

		deleteByProductId(productId);
		for (ProductDetail entity : list) {
			entity.setProductId(productId);
			entity.setUpdated(new Date());
			ProductDetail productDetail = this.productDetailRepository.saveAndFlush(entity);
			if (productDetail == null) {
				result = false;
				break;
			}
		}
		return result;
	}
}

package to.kit.shooter.service;

import java.util.Date;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.entity.Scenario;
import to.kit.shooter.repository.ProductDetailRepository;
import to.kit.shooter.repository.ScenarioRepository;

@Service
public class ProductDetailService {
	@Autowired
	private ProductDetailRepository productDetailRepository;
	@Autowired
	private ScenarioRepository scenarioRepository;

	public List<ProductDetail> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.productDetailRepository.findAll(sort);
	}

	public ProductDetail detail(String id) {
		return this.productDetailRepository.findOne(id);
	}

	@Transactional
	public ProductDetail saveMap(ProductDetail detail) {
		String id = detail.getId();

		if (id == null || id.isEmpty()) {
			return null;
		}
		this.scenarioRepository.deleteByProductDetailId(id);
		for (Scenario scenario : detail.getScenarioList()) {
			scenario.setProductDetail(detail);
			this.scenarioRepository.saveAndFlush(scenario);
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

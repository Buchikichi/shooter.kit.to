package to.kit.shooter.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.ProductActor;
import to.kit.shooter.repository.ProductActorRepository;

@Service
public class ProductActorService {
	@Autowired
	private ProductActorRepository productActorRepository;

	public List<ProductActor> list() {
		Sort sort = Sort.by(Order.desc("updated"), Order.asc("name"));
		return this.productActorRepository.findAll(sort);
	}

	public ProductActor detail(String id) {
		return this.productActorRepository.findById(id).get();
	}
}

package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Product;

/**
 * @author H.Sasai
 */
public interface ProductDetailRepository extends JpaRepository<Product, String> {
	// nop
}

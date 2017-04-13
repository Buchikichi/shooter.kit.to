package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Product;

/**
 * @author H.Sasai
 */
public interface ProductRepository extends JpaRepository<Product, String> {
	// nop
}

package to.kit.shooter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Product;

/**
 * @author H.Sasai
 */
public interface ProductRepository extends JpaRepository<Product, String> {
	List<Product> findByMediasetId(String mediasetId);
}

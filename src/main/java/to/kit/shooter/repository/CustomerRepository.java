package to.kit.shooter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import to.kit.shooter.entity.Customer;

/**
 * @author H.Sasai
 */
public interface CustomerRepository extends JpaRepository<Customer, String> {
	Customer findOneByUseridAndPassword(String userid, String passwd);
}

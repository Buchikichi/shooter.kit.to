package to.kit.shooter.service;

import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.repository.CustomerRepository;

@Service
public class CustomerService {
	@Autowired
	private CustomerRepository customerRepository;

	private String encodePassword(String plain) {
		String salt = System.getenv("SALT");

		if (salt == null) {
			salt = System.getProperty("SALT");
		}
		return DigestUtils.sha256Hex(salt + plain);
	}

	public Customer signIn(String userid, String plain) {
		String passwd = encodePassword(plain);

		return this.customerRepository.findOneByUseridAndPassword(userid, passwd);
	}

	public List<Customer> list() {
		Sort sort = new Sort(new Order(Direction.DESC, "updated"), new Order(Direction.ASC, "name"));
		return this.customerRepository.findAll(sort);
	}
}

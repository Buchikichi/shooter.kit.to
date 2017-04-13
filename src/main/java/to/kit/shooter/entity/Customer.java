package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * Customer.
 * @author H.Sasai
 */
@Entity
@Data
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String userid;
	private String name;
	private String description;
	private String email;
	private String password;
	private Date logon;
	private Date created;
	private Date updated;
}

package to.kit.shooter.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

/**
 * Scenario.
 * @author H.Sasai
 */
@Entity
@Data
public class Scenario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private int v;
	private int h;
	private String target;
	private int number;
	private String op;

	@ManyToOne
	@JsonBackReference
	private ProductDetail productDetail;
}

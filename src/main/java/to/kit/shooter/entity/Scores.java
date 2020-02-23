package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * ProductActor.
 * @author H.Sasai
 */
@Entity
@Data
public class Scores {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private int score;
	private String name;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonIgnore
	private Product product;
}

package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * ProductDetail.
 * @author H.Sasai
 */
@Entity
@Data
public class ProductDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String productId;
	private String stageId;
	private int seq;
	private int roll;
	private String map;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JoinColumn(name = "productId", referencedColumnName = "id", insertable = false, updatable = false)
	@JsonIgnore
	private Product product;

	@ManyToOne
	@JoinColumn(name = "stageId", referencedColumnName = "id", insertable = false, updatable = false)
	private Stage stage;
}

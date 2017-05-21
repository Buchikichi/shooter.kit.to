package to.kit.shooter.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import lombok.Data;

/**
 * Product.
 * @author H.Sasai
 */
@Entity
@Data
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String owner;
	private int access;
	private String name;
	private String description;
	private String icon;
	private int width;
	private int height;
	private int count;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "product")
	private List<ProductDetail> detailList;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private List<ProductActor> actorList;
}

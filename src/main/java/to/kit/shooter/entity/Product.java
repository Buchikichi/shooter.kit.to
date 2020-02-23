package to.kit.shooter.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

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
	private int crashScroll;
	private int crashBgm;
	private int crashPlayer;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "product", cascade = CascadeType.ALL)
	@OrderBy("seq")
	private List<Stage> stageList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	@OrderBy("type, seq")
	private List<ProductActor> actorList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL)
	@OrderBy("score DESC")
	private List<Scores> scoreList = new ArrayList<>();

	@ManyToOne
	private Mediaset mediaset;
}

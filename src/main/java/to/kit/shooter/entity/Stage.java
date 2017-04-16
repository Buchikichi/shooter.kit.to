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

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * Stage.
 * @author H.Sasai
 */
@Entity
@Data
public class Stage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String owner;
	private int access;
	private String name;
	private String description;
	private String map;
	private String theme;
	private String boss;
	private String bg1;
	private String bg2;
	private String bg3;
	private String fg1;
	private String fg2;
	private String fg3;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "stage", targetEntity = ProductDetail.class)
	@JsonIgnore
	private List<ProductDetail> productDetailList;
}

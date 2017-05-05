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
	private double bg1speed;
	private double bg1dir;
	private double bg1blink;
	private String bg2;
	private double bg2speed;
	private double bg2dir;
	private double bg2blink;
	private String bg3;
	private double bg3speed;
	private double bg3dir;
	private double bg3blink;
	private String fg1;
	private double fg1speed;
	private double fg1dir;
	private double fg1blink;
	private String fg2;
	private double fg2speed;
	private double fg2dir;
	private double fg2blink;
	private String fg3;
	private double fg3speed;
	private double fg3dir;
	private double fg3blink;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "stage", targetEntity = ProductDetail.class)
	@JsonIgnore
	private List<ProductDetail> productDetailList;
}

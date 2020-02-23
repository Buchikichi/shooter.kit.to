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

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Data;

/**
 * Map.
 * @author H.Sasai
 */
@Entity
@Data
public class Map {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String name;
	private String description;
	private String map;
	private int mainSeq;
	private int rebirth;
	private int brickSize;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	private Mediaset mediaset;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "map", cascade = CascadeType.ALL)
	@OrderBy("seq")
	@JsonManagedReference
	private List<MapVisual> mapVisualList = new ArrayList<>();

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "map", targetEntity = Stage.class)
	@JsonIgnore
	private List<Stage> stageList;
}

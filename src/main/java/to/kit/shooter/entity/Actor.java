package to.kit.shooter.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import to.kit.shooter.entity.type.VisualType;

/**
 * Actor.
 * @author H.Sasai
 */
@Entity
@Data
public class Actor {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	@Enumerated(EnumType.ORDINAL)
	private VisualType type;
	private int seq;
	private String className;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonBackReference
	private Product product;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actor", cascade = CascadeType.ALL)
	@OrderBy("seq")
	private List<ActorVisual> actorVisualList = new ArrayList<>();
}

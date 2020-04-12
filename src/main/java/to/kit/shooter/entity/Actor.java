package to.kit.shooter.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Convert;
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

import lombok.Data;
import to.kit.shooter.entity.type.DirType;
import to.kit.shooter.entity.type.RegionType;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;
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
	@Convert(converter = SeqTypeConverter.class)
	private SeqType seq;
	private String className;
	private int orientation;
	private int width;
	private int height;
	@Enumerated(EnumType.ORDINAL)
	private RegionType regionType;
	private int regionSize;
	private int deg;
	@Enumerated(EnumType.ORDINAL)
	private DirType dirType;
	private int dirSpeed;
	private BigDecimal speed;
	private BigDecimal gravity;
	private BigDecimal reaction;
	private int hitPoint;
	private int score;
	private String behavior;
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

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "actor", cascade = CascadeType.ALL)
	private List<ActorAudio> actorAudioList = new ArrayList<>();

	private int seqOld; // TODO: remove
}

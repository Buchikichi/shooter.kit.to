package to.kit.shooter.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	private int seq;
	private int roll;
	private int repeat;
	private int hPos;
	private int vPos;
	private int startEffect;
	private int startSpeed;
	private int startAudioType;
	private int startAudioSeq;
	private int sequelEffect;
	private int sequelSpeed;
	private int sequelAudioType;
	private int sequelAudioSeq;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonBackReference
	private Product product;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "stage", targetEntity = Scenario.class)
	@OrderBy("v, h")
	private List<Scenario> scenarioList;

	@ManyToOne
	private Map map;
}

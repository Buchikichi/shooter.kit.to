package to.kit.shooter.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Convert;
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
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;

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
	private int repeat = 1;
	@Column(name = "pos_h")
	private int posH;
	@Column(name = "pos_v")
	private int posV;
	private int startTransition;
	private int startSpeed;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType startAudioSeq = new SeqType(0);
	private int sequelTransition;
	private int sequelSpeed;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType sequelAudioSeq = new SeqType(0);
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

package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import to.kit.shooter.entity.type.DirType;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;

/**
 * ActorVisual.
 * @author H.Sasai
 */
@Entity
@Data
public class ActorVisual {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private int seq;
	private String name;
	private String description;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType visualSeq;
	@Enumerated(EnumType.ORDINAL)
	private DirType dirType;
	private int dirSpeed;

	private String anim;
	private String properties;
	private String routine;
	private String method;
	private String script;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonBackReference
	private Actor actor;
}

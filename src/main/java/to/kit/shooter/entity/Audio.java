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

import lombok.Data;
import to.kit.shooter.entity.type.AudioType;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;

/**
 * Audio.
 * @author H.Sasai
 */
@Entity
@Data
public class Audio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String mediasetId;
	private String owner;
	private int access;
	@Enumerated(EnumType.ORDINAL)
	private AudioType audioType;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType audioSeq;
	private String name;
	private String webm;
	private String audio;
	private String hash;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;
}

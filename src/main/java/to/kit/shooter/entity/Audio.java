package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

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
	private int audioType;
	private long audioSeq;
	private String name;
	private String webm;
	private String audio;
	private String hash;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;
}

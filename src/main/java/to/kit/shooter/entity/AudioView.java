package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * AudioView.
 * @author H.Sasai
 */
@Entity
@Data
public class AudioView {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String owner;
	private int access;
	private int audioType;
	private int audioSeq;
	private String name;
	private int webmlen;
	private int audiolen;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;
}

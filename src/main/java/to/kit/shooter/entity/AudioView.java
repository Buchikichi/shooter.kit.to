package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import to.kit.shooter.entity.type.AudioType;

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
	@Enumerated(EnumType.ORDINAL)
	private AudioType audioType;
	private long audioSeq;
	private String name;
	private int webmlen;
	private int audiolen;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonBackReference
	private Mediaset mediaset;
}

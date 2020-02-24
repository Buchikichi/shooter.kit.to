package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * Visual.
 * @author H.Sasai
 */
@Entity
@Data
public class Visual {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String mediasetId;
	private String owner;
	private int access;
	private int visualType;
	private long visualSeq;
	private String orientation;
	private String name;
	private String image;
	private String hash;
	private String contentType;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;
}

package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;

/**
 * VisualView.
 * @author H.Sasai
 */
@Entity()
@Data
public class VisualView {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private String owner;
	private int access;
	private int visualType;
	private long visualSeq;
	private String orientation;
	private String name;
	private int imagelen;
	private String contentType;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;

	@ManyToOne
	@JsonBackReference
	private Mediaset mediaset;
}

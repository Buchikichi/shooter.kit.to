package to.kit.shooter.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

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
	private String owner;
	private int access;
	private String name;
	private String description;
	private String imageid;
	private int type;
	private String anim;
	private String properties;
	private String routine;
	private String method;
	private String script;
	@Column(insertable = false, updatable = false)
	private Date created;
	@Column(insertable = false)
	private Date updated;
}

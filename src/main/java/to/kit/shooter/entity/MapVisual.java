package to.kit.shooter.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * MapVisual.
 * @author H.Sasai
 */
@Entity
@Data
public class MapVisual {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private int seq;
	private int visualType;
	private int visualSeq;
	private int x;
	private int y;
	private double radian;
	private double speed;
	private double blink;

	@ManyToOne
	@JsonIgnore
	private Map map;
}

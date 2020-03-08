package to.kit.shooter.entity;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Data;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;

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
	@Convert(converter = SeqTypeConverter.class)
	private SeqType visualSeq;
	private int repeat;
	private double radian;
	private double speed;
	private double blink;

	@ManyToOne
	@JsonBackReference
	private Map map;
}

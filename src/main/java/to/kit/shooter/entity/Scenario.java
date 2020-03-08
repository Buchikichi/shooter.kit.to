package to.kit.shooter.entity;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import to.kit.shooter.entity.type.SeqType;
import to.kit.shooter.entity.type.SeqTypeConverter;

/**
 * Scenario.
 * @author H.Sasai
 */
@Entity
@Data
public class Scenario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	private int v;
	private int h;
	private String target;
	private int type;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType number;
	@Enumerated(EnumType.STRING)
	private ScenarioType op;

	@ManyToOne
	@JsonIgnore
	private Stage stage;
}

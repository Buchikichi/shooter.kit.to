package to.kit.shooter.entity;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

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
	private int number;
	@Enumerated(EnumType.STRING)
	private ScenarioType op;

	@ManyToOne
	@JsonIgnore
	private Stage stage;
}

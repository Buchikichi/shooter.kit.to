package to.kit.shooter.entity;

import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

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
	@Enumerated(EnumType.STRING)
	private ScenarioType op;
	private int type;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType number = new SeqType(0);
	private String groupId;
	@Convert(converter = SeqTypeConverter.class)
	private SeqType belongings = new SeqType(0);

	@ManyToOne
	@JsonIgnore
	private Stage stage;

	@Transient
	public boolean isGroup() {
		return this.op == ScenarioType.Frm;
	}
}

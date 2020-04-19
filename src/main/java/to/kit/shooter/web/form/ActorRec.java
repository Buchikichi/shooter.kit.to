package to.kit.shooter.web.form;

import org.springframework.beans.BeanUtils;

import lombok.Getter;
import lombok.Setter;
import to.kit.shooter.entity.Actor;

/**
 * Actor record.
 * @author H.Sasai
 */
@Getter
@Setter
public final class ActorRec extends Actor {
	private int referrer;

	public static ActorRec create(Actor actor) {
		ActorRec rec = new ActorRec();

		BeanUtils.copyProperties(actor, rec);
		return rec;
	}
}

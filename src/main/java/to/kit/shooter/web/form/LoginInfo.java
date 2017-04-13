package to.kit.shooter.web.form;

import java.io.Serializable;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import lombok.Data;
import to.kit.shooter.entity.Customer;

@Component
@Scope(scopeName = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
@Data
public class LoginInfo implements Serializable {
	/** serialVersionUID. */
	private static final long serialVersionUID = -6225816471349175165L;

	private Customer customer;
}

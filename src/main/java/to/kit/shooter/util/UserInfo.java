package to.kit.shooter.util;

import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.security.oauth2.core.user.OAuth2User;

import lombok.Data;

@Data
public class UserInfo {
	boolean loggedIn;
	String name;
	String email;

	public static UserInfo convertFrom(OAuth2User oauth2User) {
		UserInfo userInfo = new UserInfo();

		if (oauth2User != null) {
			Map<String, Object> map = oauth2User.getAttributes();

			BeanUtils.copyProperties(map, userInfo);
			userInfo.setLoggedIn(true);
		}
		return userInfo;
	}

	private UserInfo() {
		// nop
	}
}

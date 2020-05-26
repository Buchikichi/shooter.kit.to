package to.kit.shooter.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HelloController {
	@RequestMapping("/")
	public String index(@AuthenticationPrincipal OAuth2User oauth2User, Model model) {
		Map<String, Object> userInfo;
		boolean loggedIn;

		if (oauth2User == null) {
			loggedIn = false;
			userInfo = new HashMap<>();
		} else {
			loggedIn = true;
			userInfo = oauth2User.getAttributes();
		}
		model.addAttribute("loggedIn", Boolean.valueOf(loggedIn));
		model.addAttribute("user", userInfo);
		return "index";
	}

	@RequestMapping("/hello")
	@ResponseBody
	public String hello() {
		return "hello!!!";
	}
}

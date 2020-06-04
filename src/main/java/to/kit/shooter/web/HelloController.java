package to.kit.shooter.web;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.util.UserInfo;

@Controller
public class HelloController {
	@RequestMapping("/")
	public String index(@AuthenticationPrincipal OAuth2User oauth2User, Model model) {
		UserInfo userInfo = UserInfo.convertFrom(oauth2User);

		model.addAttribute("loggedIn", Boolean.valueOf(userInfo.isLoggedIn()));
		model.addAttribute("user", userInfo);
		return "index";
	}

	@RequestMapping("/hello")
	@ResponseBody
	public String hello() {
		return "hello!!!";
	}
}

package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Scores;
import to.kit.shooter.service.ScoreService;
import to.kit.shooter.util.UserInfo;
import to.kit.shooter.web.form.ScoreForm;

/**
 * スコア.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/score")
public class ScoreController {
	@Autowired
	private ScoreService scoreService;

	@RequestMapping("/save")
	@ResponseBody
	public ScoreForm save(@AuthenticationPrincipal OAuth2User oauth2User, @RequestBody Scores score) {
		ScoreForm result = new ScoreForm();
		UserInfo userInfo = UserInfo.convertFrom(oauth2User);

		score.setName(userInfo.getName());
		int rank = this.scoreService.save(score);

		result.setRank(rank);
		result.setOk(true);
		return result;
	}
}

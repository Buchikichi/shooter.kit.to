package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import to.kit.shooter.entity.Scores;
import to.kit.shooter.service.ScoreService;
import to.kit.shooter.web.form.ResultForm;

import java.util.Map;

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
	public ResultForm<Integer> save(@RequestBody Scores score, OAuth2AuthenticationToken token) {
		ResultForm<Integer> result = new ResultForm<>();
		String name;

		if (token == null) {
			name = "unknown";
		} else {
			Map<String, Object> attr = token.getPrincipal().getAttributes();

			name = (String) attr.get("name");
		}
		score.setName(name);
		int rank = this.scoreService.save(score);

		result.setResult(Integer.valueOf(rank));
		result.setOk(true);
		return result;
	}
}

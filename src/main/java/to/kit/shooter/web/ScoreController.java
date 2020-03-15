package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Scores;
import to.kit.shooter.service.ScoreService;
import to.kit.shooter.web.form.ResultForm;

/**
 * スコア.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/score")
//@SessionAttributes(types = LoginInfo.class)
public class ScoreController {
	@Autowired
	private ScoreService scoreService;
//	@Autowired
//	private LoginInfo loginInfo;

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Integer> save(@RequestBody Scores score) {
		ResultForm<Integer> result = new ResultForm<>();
		int rank = this.scoreService.save(score);

		result.setResult(Integer.valueOf(rank));
		result.setOk(true);
		return result;
	}
}

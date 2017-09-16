package to.kit.shooter.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.service.ScoreService;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ScoreForm;

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

	@RequestMapping("/register")
	@ResponseBody
	public ResultForm save(ScoreForm form) {
		ResultForm result = new ResultForm();
		String productId = form.getProductId();
		int score = form.getScore();
		int rank = this.scoreService.register(productId, score);

		result.setOk(true);
		return result;
	}
}

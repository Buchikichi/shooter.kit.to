package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.service.StageService;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.StageForm;

/**
 * ステージ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/stage")
@SessionAttributes(types = LoginInfo.class)
public class StageController {
	@Autowired
	private StageService stageService;
	@Autowired
	private LoginInfo loginInfo;

	/**
	 * 一覧取得.
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@ResponseBody
	public List<Stage> list() {
		return this.stageService.list();
	}

	/**
	 * パネルでの保存.
	 * @param form フォーム
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	public ResultForm save(StageForm form) {
		ResultForm result = new ResultForm();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId != null && !loginId.isEmpty()) {
			Stage stage = new Stage();
			BeanUtils.copyProperties(form, stage);
			stage.setOwner(loginId);
			Stage saved = this.stageService.save(stage);

			result.setInfo(saved);
			result.setOk(true);
		}
		return result;
	}

	@RequestMapping("/edit")
	public String play(Model model, @RequestParam String id) {
		Stage stage = this.stageService.detail(id);

		model.addAttribute("stage", stage);
		return "edit";
	}
}

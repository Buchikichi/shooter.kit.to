package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.service.StageService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

/**
 * プロダクト詳細.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/stage")
@SessionAttributes(types = LoginInfo.class)
public class StageController implements BasicControllerInterface<Stage> {
	@Autowired
	private StageService stageService;
	@Autowired
	private LoginInfo loginInfo;

	private String getCustomerId() {
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return null;
		}
		return customer.getId();
	}

	@RequestMapping("/list")
	@ResponseBody
	@Override
	public ResultListForm list(FilteringForm form) {
		ResultListForm result = new ResultListForm();
		List<ListItem> resultList = result.getResult();
		List<Stage> list = this.stageService.list();

		for (Stage stage : list) {
			ListItem item = new ListItem();

			item.setId(stage.getId());
			resultList.add(item);
		}
		return result;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Stage select(@RequestParam String id) {
		return this.stageService.detail(id);
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Stage> save(@RequestBody Stage stage) {
		ResultForm<Stage> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		Stage saved = this.stageService.saveMap(stage);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Stage stage = this.stageService.detail(id);

		model.addAttribute("stage", stage);
		return "editStage";
	}
}

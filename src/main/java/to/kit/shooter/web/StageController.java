package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.ProductDetail;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.service.StageService;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;
import to.kit.shooter.web.form.StageForm;

/**
 * ステージ.
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
	public ResultListForm list() {
		ResultListForm form = new ResultListForm();
		List<ListItem> resultList = form.getResult();
		List<Stage> list = this.stageService.list();

		for (Stage stage : list) {
			ListItem item = new ListItem();

			item.setId(stage.getId());
			item.setName(stage.getName());
			item.setDescription(stage.getDescription());
			resultList.add(item);
		}
		return form;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Stage select(@RequestParam String id) {
		return this.stageService.detail(id);
	}

	/**
	 * パネルでの保存.
	 * @param form フォーム
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Stage> save(StageForm form) {
		ResultForm<Stage> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		Stage stage = new Stage();
		BeanUtils.copyProperties(form, stage);
		stage.setOwner(customerId);
		Stage saved = this.stageService.save(stage);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/saveMap")
	@ResponseBody
	public ResultForm<Stage> saveMap(StageForm form) {
		ResultForm<Stage> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		Stage stage = new Stage();
		BeanUtils.copyProperties(form, stage);
		stage.setOwner(customerId);
		Stage saved = this.stageService.saveMap(stage);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/edit/{id}")
	public String edit(Model model, @PathVariable("id") String id) {
		Stage stage = this.stageService.detail(id);

		model.addAttribute("stage", stage);
		model.addAttribute("detail", new ProductDetail());
		return "edit";
	}
}

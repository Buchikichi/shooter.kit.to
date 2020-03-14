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
import to.kit.shooter.entity.Map;
import to.kit.shooter.service.MapService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * マップ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/map")
@SessionAttributes(types = LoginInfo.class)
public class MapController implements BasicControllerInterface<Map> {
	@Autowired
	private MapService mapService;
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
	@Override
	public String list(Model model, @RequestBody FilteringForm<Map> form) {
		List<Map> list = this.mapService.list(form);

		model.addAttribute("list", list);
		return "_mapList";
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Map select(@RequestParam String id) {
		return this.mapService.detail(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Map map = this.mapService.detail(id);

		model.addAttribute("map", map);
		return "editMap";
	}

	/**
	 * 保存.
	 * @param map マップ
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	@Override
	public ResultForm<Map> save(@RequestBody Map map) {
		ResultForm<Map> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		Map saved = this.mapService.save(map);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

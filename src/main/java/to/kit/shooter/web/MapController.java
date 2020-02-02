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
import to.kit.shooter.entity.Product;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.service.MapService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

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
	@ResponseBody
	@Override
	public ResultListForm list(FilteringForm form) {
		ResultListForm result = new ResultListForm();
		List<ListItem> resultList = result.getResult();
		List<Map> list = this.mapService.list();

		for (Map map : list) {
			ListItem item = new ListItem();

			item.setId(map.getId());
			item.setName(map.getName());
			item.setDescription(map.getDescription());
			resultList.add(item);
		}
		return result;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public Map select(@RequestParam String id) {
		return this.mapService.detail(id);
	}

	/**
	 * パネルでの保存.
	 * @param map マップ
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Map> save(@RequestBody Map map) {
		ResultForm<Map> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		map.setOwner(customerId);
		Map saved = this.mapService.save(map);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Map map = this.mapService.detail(id);
		Stage detail = map.getStage();
		Product product = detail.getProduct();

		model.addAttribute("mediasetId", product.getMediaset().getId());
		model.addAttribute("map", map);
		model.addAttribute("detail", new Stage());
		return "editMap";
	}
}

package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Map;
import to.kit.shooter.service.MapService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * マップ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/map")
public class MapController implements BasicControllerInterface<Map> {
	@Autowired
	private MapService mapService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Map> form) {
		List<Map> list = this.mapService.list(form);

		model.addAttribute("list", list);
		return "_mapList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Map select(@PathVariable("id") String id) {
		return this.mapService.select(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Map map = this.mapService.select(id);

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
	public ResultForm<Map> save(@AuthenticationPrincipal OAuth2User oauth2User, @RequestBody Map map) {
		ResultForm<Map> result = new ResultForm<>();
		Map saved = this.mapService.save(map);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

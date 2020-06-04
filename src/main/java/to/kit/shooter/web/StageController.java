package to.kit.shooter.web;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Scenario;
import to.kit.shooter.entity.Stage;
import to.kit.shooter.service.StageService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * プロダクト詳細.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/stage")
public class StageController implements BasicControllerInterface<Stage> {
	@Autowired
	private StageService stageService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Stage> form) {
		List<Stage> list = this.stageService.list(form);

		model.addAttribute("productList", list);
		return "_stageList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Stage select(@PathVariable("id") String id) {
		return this.stageService.select(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Stage stage = this.stageService.select(id);
		List<Scenario> groupList = stage.getScenarioList().stream()
				.filter(Scenario::isGroup)
				.collect(Collectors.toList());

		model.addAttribute("stage", stage);
		model.addAttribute("groupList", groupList);
		return "editStage";
	}

	@RequestMapping("/save")
	@ResponseBody
	@Override
	public ResultForm<Stage> save(@AuthenticationPrincipal OAuth2User oauth2User, @RequestBody Stage stage) {
		ResultForm<Stage> result = new ResultForm<>();
		Stage saved = this.stageService.save(stage);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

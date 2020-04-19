package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.type.VisualType;
import to.kit.shooter.service.ActorService;
import to.kit.shooter.web.form.ActorRec;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * アクター.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/actor")
public class ActorController implements BasicControllerInterface<Actor> {
	@Autowired
	private ActorService service;

	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Actor> form) {
		List<ActorRec> actorList = this.service.listWithReferrer(form);
		Boolean hasDivider = Boolean.valueOf(form.getCriteria().getType() == VisualType.None);

		model.addAttribute("hasDivider", hasDivider);
		model.addAttribute("actorList", actorList);
		return "_actorList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Actor select(@PathVariable("id") String id) {
		return this.service.select(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Actor actor = this.service.select(id);

		model.addAttribute("actor", actor);
		return "editActor";
	}

	@RequestMapping("/save")
	@ResponseBody
	@Override
	public ResultForm<Actor> save(@RequestBody Actor actor) {
		ResultForm<Actor> result = new ResultForm<>();
		Actor saved = this.service.save(actor);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

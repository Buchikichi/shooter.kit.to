package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.ActorService;
import to.kit.shooter.web.form.ActorForm;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * アクター.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/actor")
@SessionAttributes(types = LoginInfo.class)
public class ActorController implements BasicControllerInterface<Actor> {
	@Autowired
	private ActorService service;
	@Autowired
	private LoginInfo loginInfo;

	/**
	 * 一覧取得.
	 * @param model Model
	 * @param criteria 条件
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@Override
	public String list(Model model, @RequestBody FilteringForm<Actor> criteria) {
		List<Actor> actorList = this.service.list(criteria);

		model.addAttribute("actorList", actorList);
		return "_actorList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Actor select(@PathVariable("id") String id) {
		return this.service.select(id);
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Actor> save(ActorForm form) {
		ResultForm<Actor> result = new ResultForm<>();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId != null && !loginId.isEmpty()) {
			Actor actor = new Actor();
			BeanUtils.copyProperties(form, actor);
			Actor saved = this.service.save(actor);

			result.setResult(saved);
			result.setOk(true);
		}
		return result;
	}
}

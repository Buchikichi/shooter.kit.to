package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Actor;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.ActorService;
import to.kit.shooter.web.form.ActorForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * アクター.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/actor")
@SessionAttributes(types = LoginInfo.class)
public class ActorController {
	@Autowired
	private ActorService actorService;
	@Autowired
	private LoginInfo loginInfo;

	/**
	 * 一覧取得.
	 * @param form フォーム
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@ResponseBody
	public List<Actor> list(ActorForm form) {
		return this.actorService.list(form.getKeyword(), form.getType());
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
			actor.setOwner(loginId);
			Actor saved = this.actorService.save(actor);

			result.setResult(saved);
			result.setOk(true);
		}
		return result;
	}
}

package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import to.kit.shooter.entity.Mediaset;
import to.kit.shooter.service.MediasetService;
import to.kit.shooter.web.form.AudioSetForm;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;

/**
 * メディアセット.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/mediaset")
public class MediasetController implements BasicControllerInterface<Mediaset> {
	@Autowired
	private MediasetService mediasetService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, FilteringForm<Mediaset> form) {
		List<Mediaset> list = this.mediasetService.list(form);

		model.addAttribute("list", list);
		return "_mediasetList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public Mediaset select(@PathVariable("id") String id) {
		return this.mediasetService.select(id);
	}

	@RequestMapping("/edit/{id}")
	@Override
	public String edit(Model model, @PathVariable("id") String id) {
		Mediaset mediaset = this.mediasetService.select(id);

		model.addAttribute("mediaset", mediaset);
		return "editMediaset";
	}

	/**
	 * パネルでの保存.
	 * @param form フォーム
	 * @param token 
	 * @return 結果
	 */
	@RequestMapping("/save")
	@ResponseBody
	public ResultForm<Mediaset> save(AudioSetForm form, OAuth2AuthenticationToken token) {
		ResultForm<Mediaset> result = new ResultForm<>();
		String customerId = token.getPrincipal().getName();
		Mediaset audioSet = new Mediaset();
		BeanUtils.copyProperties(form, audioSet);
		audioSet.setOwner(customerId);
		Mediaset saved = this.mediasetService.save(audioSet);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

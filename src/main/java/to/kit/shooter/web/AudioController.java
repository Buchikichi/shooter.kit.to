package to.kit.shooter.web;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.AudioService;
import to.kit.shooter.web.form.AudioForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * オーディオ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/audio")
@SessionAttributes(types = LoginInfo.class)
public class AudioController {
	@Autowired
	private AudioService audioService;
	@Autowired
	private LoginInfo loginInfo;

	/**
	 * 一覧取得.
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@ResponseBody
	public List<Audio> list() {
		return this.audioService.list();
	}

	@RequestMapping("/save")
	@ResponseBody
	public ResultForm save(AudioForm form) {
		ResultForm result = new ResultForm();
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId != null && !loginId.isEmpty()) {
			Audio audio = new Audio();
			BeanUtils.copyProperties(form, audio);
			audio.setOwner(loginId);
			Audio saved = this.audioService.save(audio);

			result.setInfo(saved);
			result.setOk(true);
		}
		return result;
	}
}

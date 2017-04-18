package to.kit.shooter.web;

import java.io.IOException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioShort;
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
	public List<AudioShort> list() {
		return this.audioService.list();
	}

	private String getAudioString(MultipartFile file) {
		if (file == null || file.isEmpty()) {
			return null;
		}
		String[] types = file.getContentType().split("/");
		boolean isOK = false;

		for (String type : types) {
			if ("audio".equals(type) || "webm".equals(type)) {
				isOK = true;
				break;
			}
		}
		if (!isOK) {
			return null;
		}
		byte[] bytes = null;
		try {
			bytes = file.getBytes();
		} catch (@SuppressWarnings("unused") IOException e) {
			// nop
		}
		if (bytes == null) {
			return null;
		}
		return Base64.encodeBase64String(bytes);
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

		if (loginId == null || loginId.isEmpty()) {
			return result;
		}
		Audio entity = new Audio();
		BeanUtils.copyProperties(form, entity);
		entity.setData(getAudioString(form.getData()));
		entity.setOwner(loginId);
		Audio saved = this.audioService.save(entity);

		result.setInfo(saved);
		result.setOk(true);
		return result;
	}
}

package to.kit.shooter.web;

import java.io.IOException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioView;
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
	public List<AudioView> list() {
		return this.audioService.list();
	}

	/**
	 * 一件取得.
	 * @param id オーディオID
	 * @return オーディオ
	 */
	@RequestMapping("/select")
	@ResponseBody
	public AudioView select(@RequestParam String id) {
		return this.audioService.detail(id);
	}

	private Resource decodeAudio(String base64) {
		if (base64 == null || base64.isEmpty()) {
			return null;
		}
		byte[] bytes = Base64.decodeBase64(base64);

		return new ByteArrayResource(bytes);
	}

	/**
	 * WebM取得.
	 * @param id オーディオID
	 * @return WebMデータ
	 */
	@RequestMapping(value = "/webm", produces = "audio/webm")
	@ResponseBody
	public Resource webm(@RequestParam String id) {
		Audio audio = this.audioService.findOne(id);

		if (audio == null) {
			return null;
		}
		return decodeAudio(audio.getWebm());
	}

	/**
	 * Audio取得.
	 * @param id オーディオID
	 * @return WebMデータ
	 */
	@RequestMapping(value = "/audio", produces = "audio/mpeg")
	@ResponseBody
	public Resource audio(@RequestParam String id) {
		Audio audio = this.audioService.findOne(id);

		if (audio == null) {
			return null;
		}
		return decodeAudio(audio.getAudio());
	}

	private String getAudioString(MultipartFile file, String accept) {
		if (file == null || file.isEmpty()) {
			return null;
		}
		String[] types = file.getContentType().split("/");
		boolean isOK = false;

		for (String type : types) {
			if (type.equals(accept)) {
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
		entity.setWebm(getAudioString(form.getWebm(), "webm"));
		entity.setAudio(getAudioString(form.getAudio(), "audio"));
		entity.setOwner(loginId);
		Audio saved = this.audioService.save(entity);

		result.setInfo(saved);
		result.setOk(true);
		return result;
	}
}

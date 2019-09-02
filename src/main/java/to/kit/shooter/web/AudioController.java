package to.kit.shooter.web;

import java.io.IOException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Audio;
import to.kit.shooter.entity.AudioType;
import to.kit.shooter.entity.AudioView;
import to.kit.shooter.entity.Customer;
import to.kit.shooter.service.AudioService;
import to.kit.shooter.web.form.AudioForm;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;

/**
 * オーディオ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/audio")
@SessionAttributes(types = LoginInfo.class)
public class AudioController extends BasicMediaController implements BasicControllerInterface<AudioView> {
	@Autowired
	private AudioService audioService;
	@Autowired
	private LoginInfo loginInfo;

	/**
	 * 一覧取得.
	 * @param form フォーム
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@ResponseBody
	@Override
	public ResultListForm list(FilteringForm form) {
		ResultListForm result = new ResultListForm();
		List<ListItem> resultList = result.getResult();
		List<AudioView> list = this.audioService.list(form.getMediasetId(), form.getType());

		for (AudioView audio : list) {
			ListItem item = new ListItem();
			AudioType type = AudioType.getType(audio.getAudioType());

			item.setId(audio.getId());
			item.setName(audio.getName());
			item.setCount(type.name());
			item.setDescription(String.valueOf(audio.getAudioSeq()));
			resultList.add(item);
		}
		return result;
	}

	/**
	 * 一件取得.
	 * @param id オーディオID
	 * @return オーディオ
	 */
	@RequestMapping("/select")
	@ResponseBody
	@Override
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
	@RequestMapping(value = "/webm/{id}", produces = "audio/webm")
	@ResponseBody
	public Resource webm(@PathVariable("id") String id) {
		Audio audio = this.audioService.findOne(id);

		if (audio == null) {
			return null;
		}
		return decodeAudio(audio.getWebm());
	}

	/**
	 * WebM取得.
	 * @param name WebM名
	 * @return WebMデータ
	 */
	@RequestMapping(value = "/webmName/{name}", produces = "audio/webm")
	@ResponseBody
	public Resource webmName(@PathVariable("name") String name) {
		Audio audio = this.audioService.findByName(name);

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
	@RequestMapping(value = "/audio/{id}", produces = "audio/mpeg")
	@ResponseBody
	public Resource audio(@PathVariable("id") String id) {
		Audio audio = this.audioService.findOne(id);

		if (audio == null) {
			return null;
		}
		return decodeAudio(audio.getAudio());
	}

	/**
	 * Audio取得.
	 * @param name オーディオ名
	 * @return WebMデータ
	 */
	@RequestMapping(value = "/audioName/{name}", produces = "audio/mpeg")
	@ResponseBody
	public Resource audioName(@PathVariable("name") String name) {
		Audio audio = this.audioService.findByName(name);

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
	public ResultForm<Audio> save(AudioForm form) {
		ResultForm<Audio> result = new ResultForm<>();
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
		entity.setHash(getHash(form.getWebm()));
		entity.setOwner(loginId);
		Audio saved = this.audioService.save(entity);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

package to.kit.shooter.web;

import java.io.IOException;
import java.util.List;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Visual;
import to.kit.shooter.entity.VisualView;
import to.kit.shooter.service.VisualService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.VisualForm;

/**
 * イメージ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/visual")
public class VisualController extends BasicMediaController implements BasicControllerInterface<VisualView> {
	@Autowired
	private VisualService visualService;

	@RequestMapping("/list")
	@Override
	public String list(Model model, FilteringForm<VisualView> form) {
		List<VisualView> list = this.visualService.list(form);

		model.addAttribute("list", list);
		return "_visualList";
	}

	@RequestMapping("/select/{id}")
	@ResponseBody
	@Override
	public VisualView select(@PathVariable("id") String id) {
		return this.visualService.select(id);
	}

	private ResponseEntity<Resource> createResponseEntity(Visual visual) {
		HttpHeaders headers = new HttpHeaders();
		byte[] bytes = Base64.decodeBase64(visual.getImage());
		Resource resource = new ByteArrayResource(bytes);

		headers.setContentType(MediaType.valueOf(visual.getContentType()));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	@RequestMapping(value = "/src/{id}")
	@ResponseBody
	public ResponseEntity<Resource> src(@PathVariable("id") String id) {
		Visual visual = this.visualService.findOne(id);

		return createResponseEntity(visual);
	}

	@RequestMapping(value = "/name/{name:.+}")
	@ResponseBody
	public ResponseEntity<Resource> res(@PathVariable("name") String name) {
		Visual visual = this.visualService.findByName(name);

		return createResponseEntity(visual);
	}

	private String getImageString(MultipartFile file) {
		if (file == null || file.isEmpty()) {
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
	public ResultForm<Visual> save(@Validated VisualForm form, OAuth2AuthenticationToken token) {
		ResultForm<Visual> result = new ResultForm<>();
		String customerId = token.getPrincipal().getName();
		MultipartFile imageFile = form.getImage();
		String contentType = imageFile.getContentType();
		Visual entity = new Visual();
		BeanUtils.copyProperties(form, entity);
		entity.setImage(getImageString(imageFile));
		entity.setHash(getHash(imageFile));
		entity.setContentType(contentType);
		entity.setOwner(customerId);
		Visual saved = this.visualService.save(entity);

		result.setResult(saved);
		result.setOk(true);
		return result;
	}
}

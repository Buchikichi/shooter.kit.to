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
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Visual;
import to.kit.shooter.entity.VisualType;
import to.kit.shooter.entity.VisualView;
import to.kit.shooter.service.VisualService;
import to.kit.shooter.web.form.FilteringForm;
import to.kit.shooter.web.form.ListItem;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;
import to.kit.shooter.web.form.ResultListForm;
import to.kit.shooter.web.form.VisualForm;

/**
 * イメージ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/visual")
@SessionAttributes(types = LoginInfo.class)
public class VisualController extends BasicMediaController implements BasicControllerInterface<VisualView> {
	@Autowired
	private VisualService visualService;
	@Autowired
	private LoginInfo loginInfo;

	private String getCustomerId() {
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return null;
		}
		return customer.getId();
	}

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

		for (VisualView visual : this.visualService.list(form.getMediasetId(), form.getType())) {
			ListItem item = new ListItem();
			VisualType type = VisualType.getType(visual.getVisualType());

			BeanUtils.copyProperties(visual, item);
			item.setCount(type.name());
			item.setAside(visual.getOrientation());
			item.setDescription(String.valueOf(visual.getVisualSeq()));
			resultList.add(item);
		}
		return result;
	}

	@RequestMapping("/select")
	@ResponseBody
	@Override
	public VisualView select(@RequestParam String id) {
		return this.visualService.detail(id);
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
	public ResultForm<Visual> save(VisualForm form) {
		ResultForm<Visual> result = new ResultForm<>();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
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

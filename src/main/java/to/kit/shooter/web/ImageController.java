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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Image;
import to.kit.shooter.entity.ImageView;
import to.kit.shooter.service.ImageService;
import to.kit.shooter.web.form.ImageForm;
import to.kit.shooter.web.form.LoginInfo;
import to.kit.shooter.web.form.ResultForm;

/**
 * イメージ.
 * @author H.Sasai
 */
@Controller
@RequestMapping("/image")
@SessionAttributes(types = LoginInfo.class)
public class ImageController {
	@Autowired
	private ImageService imageService;
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
	public List<ImageView> list(ImageForm form) {
		return this.imageService.list(form.getKeyword(), form.getType());
	}

	private ResponseEntity<Resource> createResponseEntity(Image image) {
		HttpHeaders headers = new HttpHeaders();
		byte[] bytes = Base64.decodeBase64(image.getImage());
		Resource resource = new ByteArrayResource(bytes);

		headers.setContentType(MediaType.valueOf(image.getContentType()));
		return new ResponseEntity<>(resource, headers, HttpStatus.OK);
	}

	@RequestMapping(value = "/src/{id}")
	@ResponseBody
	public ResponseEntity<Resource> src(@PathVariable("id") String id) {
		Image image = this.imageService.findOne(id);

		return createResponseEntity(image);
	}

	@RequestMapping(value = "/name/{name:.+}")
	@ResponseBody
	public ResponseEntity<Resource> res(@PathVariable("name") String name) {
		Image image = this.imageService.findByName(name);

		return createResponseEntity(image);
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
	public ResultForm save(ImageForm form) {
		ResultForm result = new ResultForm();
		String customerId = getCustomerId();

		if (customerId == null || customerId.isEmpty()) {
			return result;
		}
		MultipartFile imageFile = form.getImage();
		String contentType = imageFile.getContentType();
		Image entity = new Image();
		BeanUtils.copyProperties(form, entity);
		entity.setImage(getImageString(imageFile));
		entity.setContentType(contentType);
		entity.setOwner(customerId);
		Image saved = this.imageService.save(entity);

		result.setInfo(saved);
		result.setOk(true);
		return result;
	}
}

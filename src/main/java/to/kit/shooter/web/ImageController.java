package to.kit.shooter.web;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import to.kit.shooter.entity.Customer;
import to.kit.shooter.entity.Image;
import to.kit.shooter.entity.ImageShort;
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

	/**
	 * 一覧取得.
	 * @return 一覧
	 */
	@RequestMapping("/list")
	@ResponseBody
	public List<ImageShort> list() {
		return this.imageService.list();
	}

	@RequestMapping(value = "/src",produces = MediaType.IMAGE_PNG_VALUE)
	@ResponseBody
	public Resource src(ImageForm form) {
		Image image = this.imageService.detail(form.getId());
		byte[] bytes = Base64.decodeBase64(image.getImage());

		return new ByteArrayResource(bytes);
	}

	private String getImageString(MultipartFile file) {
		BufferedImage image = null;

		if (file.isEmpty()) {
			return null;
		}
		String[] types = file.getContentType().split("/");

		if (!"image".equals(types[0])) {
			return null;
		}
		try(InputStream in = file.getInputStream()) {
			image = ImageIO.read(in);
		} catch (@SuppressWarnings("unused") IOException e) {
			// nop
		}
		if (image == null) {
			return null;
		}
		//
		byte[] bytes = null;

		try (ByteArrayOutputStream out = new ByteArrayOutputStream();
				BufferedOutputStream buff = new BufferedOutputStream(out)) {
			ImageIO.write(image, "png", buff);
			buff.flush();
			bytes = out.toByteArray();
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
		Customer customer = this.loginInfo.getCustomer();

		if (customer == null) {
			return result;
		}
		String loginId = customer.getId();

		if (loginId == null || loginId.isEmpty()) {
			return result;
		}
		Image entity = new Image();
		BeanUtils.copyProperties(form, entity);
		entity.setImage(getImageString(form.getImage()));
		entity.setThumb(getImageString(form.getThumb()));
		entity.setOwner(loginId);
		Image saved = this.imageService.save(entity);

		result.setInfo(saved);
		result.setOk(true);
		return result;
	}
}

package to.kit.shooter.web.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * Image form.
 * @author H.Sasai
 */
@Data
public final class ImageForm {
	private String id;
	private String owner;
	private int access;
	private int type;
	private String name;
	private String description;
	private MultipartFile image;
	private MultipartFile thumb;
}

package to.kit.shooter.web.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * Visual form.
 * @author H.Sasai
 */
@Data
public final class VisualForm {
	private String id;
	private String mediasetId;
	private String owner;
	private int access;
	private int visualType;
	private int visualSeq;
	private String orientation;
	private String name;
	private MultipartFile image;
	private MultipartFile thumb;

	private String keyword;
}

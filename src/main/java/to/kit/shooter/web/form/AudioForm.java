package to.kit.shooter.web.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

/**
 * Audio form.
 * @author H.Sasai
 */
@Data
public final class AudioForm {
	private String id;
	private String owner;
	private int access;
	private int type;
	private String name;
	private MultipartFile data;
}

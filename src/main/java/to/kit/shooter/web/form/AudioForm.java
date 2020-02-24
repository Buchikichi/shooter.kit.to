package to.kit.shooter.web.form;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import to.kit.shooter.entity.type.AudioType;

/**
 * Audio form.
 * @author H.Sasai
 */
@Data
public final class AudioForm {
	private String id;
	private String mediasetId;
	private String owner;
	private int access;
	private AudioType audioType;
	private long audioSeq;
	private String name;
	private MultipartFile webm;
	private MultipartFile audio;

	private String keyword;
}

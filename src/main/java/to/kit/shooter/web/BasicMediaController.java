package to.kit.shooter.web;

import java.io.IOException;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

abstract class BasicMediaController {
	protected String getHash(MultipartFile file) {
		byte[] bytes = {};

		if (file != null && file.isEmpty()) {
			try {
				bytes = file.getBytes();
			} catch (@SuppressWarnings("unused") IOException e) {
				// nop
			}
		}
		return DigestUtils.sha1Hex(bytes);
	}
}

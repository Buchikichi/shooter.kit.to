package to.kit.shooter.service;

import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class UtilsService {
	public String createUUID() {
		return UUID.randomUUID().toString();
	}
}

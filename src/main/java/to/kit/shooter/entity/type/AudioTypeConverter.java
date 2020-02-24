package to.kit.shooter.entity.type;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class AudioTypeConverter implements Converter<String, AudioType>{
	@Override
	public AudioType convert(String source) {
		return AudioType.fromString(source);
	}
}

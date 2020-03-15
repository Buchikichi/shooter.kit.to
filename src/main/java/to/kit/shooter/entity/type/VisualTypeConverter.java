package to.kit.shooter.entity.type;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class VisualTypeConverter implements Converter<String, VisualType> {
	@Override
	public VisualType convert(String source) {
		return VisualType.fromString(source);
	}
}

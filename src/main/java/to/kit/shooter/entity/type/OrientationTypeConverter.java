package to.kit.shooter.entity.type;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class OrientationTypeConverter implements Converter<String, OrientationType>{
	@Override
	public OrientationType convert(String source) {
		return OrientationType.fromString(source);
	}
}

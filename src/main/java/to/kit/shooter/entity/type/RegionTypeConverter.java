package to.kit.shooter.entity.type;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class RegionTypeConverter implements Converter<String, RegionType>{
	@Override
	public RegionType convert(String source) {
		return RegionType.fromString(source);
	}
}

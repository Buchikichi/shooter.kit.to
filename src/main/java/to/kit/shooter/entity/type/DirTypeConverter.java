package to.kit.shooter.entity.type;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class DirTypeConverter implements Converter<String, DirType>{
	@Override
	public DirType convert(String source) {
		return DirType.fromString(source);
	}
}

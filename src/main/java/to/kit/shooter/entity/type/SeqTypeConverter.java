package to.kit.shooter.entity.type;

import javax.persistence.AttributeConverter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class SeqTypeConverter implements Converter<String, SeqType>, AttributeConverter<SeqType, Long> {
	@Override
	public SeqType convert(String source) {
		return new SeqType(source);
	}

	@Override
	public Long convertToDatabaseColumn(SeqType attribute) {
		return Long.valueOf(attribute.longValue());
	}

	@Override
	public SeqType convertToEntityAttribute(Long dbData) {
		return new SeqType(dbData);
	}
}

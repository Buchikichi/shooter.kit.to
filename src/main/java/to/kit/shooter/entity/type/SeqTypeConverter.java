package to.kit.shooter.entity.type;

import javax.persistence.AttributeConverter;

public class SeqTypeConverter implements AttributeConverter<SeqType, Long> {
	@Override
	public Long convertToDatabaseColumn(SeqType attribute) {
		return Long.valueOf(attribute.longValue());
	}

	@Override
	public SeqType convertToEntityAttribute(Long dbData) {
		return new SeqType(dbData);
	}
}

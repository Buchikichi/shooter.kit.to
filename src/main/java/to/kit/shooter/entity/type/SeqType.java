package to.kit.shooter.entity.type;

import java.math.BigInteger;
import java.util.UUID;

import org.apache.commons.codec.digest.MurmurHash2;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public final class SeqType extends Number {
	private static final long serialVersionUID = 4201473338810305814L;
	private long value;

	@Override
	public int intValue() {
		return (int) this.value;
	}

	@Override
	public long longValue() {
		return this.value;
	}

	@Override
	public float floatValue() {
		return this.value;
	}

	@Override
	public double doubleValue() {
		return this.value;
	}

	@Override
	@JsonValue
	public String toString() {
		return Long.toHexString(this.value);
	}

	public SeqType(Long value) {
		this.value = value.longValue();
	}

	@JsonCreator
	public SeqType(String source) {
		this.value = new BigInteger(source, 16).longValue();
	}

	public SeqType() {
		this.value = MurmurHash2.hash64(UUID.randomUUID().toString());
	}
}

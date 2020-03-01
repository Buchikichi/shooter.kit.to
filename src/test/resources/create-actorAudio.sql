-- Table: actor_audio

-- DROP TABLE actor_audio;

CREATE TABLE actor_audio(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	actor_id varchar(36) NOT NULL,
	audio_type integer NOT NULL,
	audio_seq bigint NOT NULL,
	gain real NOT NULL DEFAULT 1,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON TABLE actor_audio IS 'アクターオーディオ';
COMMENT ON COLUMN actor_audio.id IS 'ID';
COMMENT ON COLUMN actor_audio.actor_id IS 'アクターID';
COMMENT ON COLUMN actor_audio.audio_type IS 'タイプ';
COMMENT ON COLUMN actor_audio.audio_seq IS 'seq';
COMMENT ON COLUMN actor_audio.gain IS 'gain';
COMMENT ON COLUMN actor_audio.created IS '作成日';
COMMENT ON COLUMN actor_audio.updated IS '更新日';

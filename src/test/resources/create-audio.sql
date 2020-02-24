-- Table: audio

-- DROP TABLE audio;

CREATE TABLE IF NOT EXISTS audio(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	mediaset_id varchar(36) NOT NULL,
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	audio_type integer NOT NULL,
	audio_seq bigint NOT NULL,
	name text NOT NULL,
	webm text,
	audio text,
	hash varchar(64) NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN audio.id IS 'ID';
COMMENT ON COLUMN audio.owner IS '所有者';
COMMENT ON COLUMN audio.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN audio.type IS 'タイプ';
COMMENT ON COLUMN audio.name IS '名前';
COMMENT ON COLUMN audio.webm IS 'WebM';
COMMENT ON COLUMN audio.audio IS 'MP3?';
COMMENT ON COLUMN audio.hash IS 'ハッシュ値';
COMMENT ON COLUMN audio.created IS '作成日';
COMMENT ON COLUMN audio.updated IS '更新日';

ALTER TABLE audio RENAME type TO audio_type;
ALTER TABLE audio ADD mediaset_id varchar(36) NOT NULL DEFAULT '';
ALTER TABLE audio ADD audio_seq bigint NOT NULL DEFAULT 0;
ALTER TABLE audio ADD hash varchar(64) NOT NULL DEFAULT '';

-- Table: audio

-- DROP TABLE audio;

CREATE TABLE audio(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	type integer NOT NULL,
	name text NOT NULL,
	data text NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN audio.id IS 'ID';
COMMENT ON COLUMN audio.owner IS '所有者';
COMMENT ON COLUMN audio.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN audio.type IS 'タイプ';
COMMENT ON COLUMN audio.name IS '名前';
COMMENT ON COLUMN audio.data IS 'データ';
COMMENT ON COLUMN audio.created IS '作成日';
COMMENT ON COLUMN audio.updated IS '更新日';

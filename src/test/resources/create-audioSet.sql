-- Table: audio_set

-- DROP TABLE audio_set;

CREATE TABLE audio_set(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	action text,
	reaction text,
	notice text,
	introduction text,
	theme text,
	boss text,
	ending text,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN audio_set.id IS 'ID';
COMMENT ON COLUMN audio_set.owner IS '所有者';
COMMENT ON COLUMN audio_set.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN audio_set.name IS '名前';
COMMENT ON COLUMN audio_set.action IS '行動';
COMMENT ON COLUMN audio_set.reaction IS '反応';
COMMENT ON COLUMN audio_set.notice IS '通知';
COMMENT ON COLUMN audio_set.introduction IS 'イントロ';
COMMENT ON COLUMN audio_set.theme IS 'メインテーマ';
COMMENT ON COLUMN audio_set.boss IS 'ボス';
COMMENT ON COLUMN audio_set.ending IS 'エンディング';
COMMENT ON COLUMN audio_set.created IS '作成日';
COMMENT ON COLUMN audio_set.updated IS '更新日';

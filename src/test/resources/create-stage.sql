-- Table: stage

-- DROP TABLE stage;

CREATE TABLE stage(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	description text NOT NULL,
	map text,
	theme varchar(36),
	boss varchar(36),
	bg1 varchar(36),
	bg2 varchar(36),
	bg3 varchar(36),
	fg1 varchar(36),
	fg2 varchar(36),
	fg3 varchar(36),
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN stage.id IS 'ID';
COMMENT ON COLUMN stage.owner IS '所有者';
COMMENT ON COLUMN stage.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN stage.name IS '名前';
COMMENT ON COLUMN stage.description IS '説明';
COMMENT ON COLUMN stage.map IS 'map';
COMMENT ON COLUMN stage.theme IS 'theme';
COMMENT ON COLUMN stage.boss IS 'boss';
COMMENT ON COLUMN stage.bg1 IS 'bg1';
COMMENT ON COLUMN stage.bg2 IS 'bg2';
COMMENT ON COLUMN stage.bg3 IS 'bg3';
COMMENT ON COLUMN stage.fg1 IS 'fg1';
COMMENT ON COLUMN stage.fg2 IS 'fg2';
COMMENT ON COLUMN stage.fg3 IS 'fg3';
COMMENT ON COLUMN stage.created IS '作成日';
COMMENT ON COLUMN stage.updated IS '更新日';

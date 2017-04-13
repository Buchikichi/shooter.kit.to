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
	b1 varchar(36),
	b2 varchar(36),
	b3 varchar(36),
	f1 varchar(36),
	f2 varchar(36),
	f3 varchar(36),
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
COMMENT ON COLUMN stage.b1 IS 'b1';
COMMENT ON COLUMN stage.b2 IS 'b2';
COMMENT ON COLUMN stage.b3 IS 'b3';
COMMENT ON COLUMN stage.f1 IS 'f1';
COMMENT ON COLUMN stage.f2 IS 'f2';
COMMENT ON COLUMN stage.f3 IS 'f3';
COMMENT ON COLUMN stage.created IS '作成日';
COMMENT ON COLUMN stage.updated IS '更新日';

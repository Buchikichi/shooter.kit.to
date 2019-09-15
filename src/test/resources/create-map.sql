-- Table: map

-- DROP TABLE map;

CREATE TABLE map(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	description text NOT NULL,
	map text,
	brick_size integer NOT NULL,
	main_seq integer NOT NULL,

	theme varchar(36),
	boss varchar(36),
	bg1 varchar(36),
	bg1speed real NOT NULL DEFAULT 0,
	bg1dir real NOT NULL DEFAULT 0,
	bg1blink real NOT NULL DEFAULT 0,
	bg2 varchar(36),
	bg2speed real NOT NULL DEFAULT 0,
	bg2dir real NOT NULL DEFAULT 0,
	bg2blink real NOT NULL DEFAULT 0,
	bg3 varchar(36),
	bg3speed real NOT NULL DEFAULT 0,
	bg3dir real NOT NULL DEFAULT 0,
	bg3blink real NOT NULL DEFAULT 0,
	fg1 varchar(36),
	fg1speed real NOT NULL DEFAULT 0,
	fg1dir real NOT NULL DEFAULT 0,
	fg1blink real NOT NULL DEFAULT 0,
	fg2 varchar(36),
	fg2speed real NOT NULL DEFAULT 0,
	fg2dir real NOT NULL DEFAULT 0,
	fg2blink real NOT NULL DEFAULT 0,
	fg3 varchar(36),
	fg3speed real NOT NULL DEFAULT 0,
	fg3dir real NOT NULL DEFAULT 0,
	fg3blink real NOT NULL DEFAULT 0,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN map.id IS 'ID';
COMMENT ON COLUMN map.owner IS '所有者';
COMMENT ON COLUMN map.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN map.name IS '名前';
COMMENT ON COLUMN map.description IS '説明';
COMMENT ON COLUMN map.map IS 'map';
COMMENT ON COLUMN map.theme IS 'theme';
COMMENT ON COLUMN map.boss IS 'boss';
COMMENT ON COLUMN map.bg1 IS 'bg1';
COMMENT ON COLUMN map.bg2 IS 'bg2';
COMMENT ON COLUMN map.bg3 IS 'bg3';
COMMENT ON COLUMN map.fg1 IS 'fg1';
COMMENT ON COLUMN map.fg2 IS 'fg2';
COMMENT ON COLUMN map.fg3 IS 'fg3';
COMMENT ON COLUMN map.created IS '作成日';
COMMENT ON COLUMN map.updated IS '更新日';


ALTER TABLE stage RENAME TO map;
ALTER TABLE map ADD brick_size integer NOT NULL DEFAULT 1;
ALTER TABLE map ADD main_seq integer NOT NULL DEFAULT 0;

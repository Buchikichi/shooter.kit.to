-- Table: map

-- DROP TABLE map;

CREATE TABLE map(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	mediaset_id varchar(36) NOT NULL,
	name text NOT NULL,
	map text,
	brick_size integer NOT NULL,
	rebirth integer NOT NULL DEFAULT 0,
	main_seq integer NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN map.id IS 'ID';
COMMENT ON COLUMN map.mediaset_id IS 'Mediaset ID';
COMMENT ON COLUMN map.name IS '名前';
COMMENT ON COLUMN map.map IS 'map';
COMMENT ON COLUMN map.brick_size IS 'brick_size';
COMMENT ON COLUMN map.rebirth IS 'rebirth';
COMMENT ON COLUMN map.main_seq IS 'main_seq';
COMMENT ON COLUMN map.created IS '作成日';
COMMENT ON COLUMN map.updated IS '更新日';


ALTER TABLE stage RENAME TO map;
ALTER TABLE map ADD brick_size integer NOT NULL DEFAULT 1;
ALTER TABLE map ADD rebirth integer NOT NULL DEFAULT 0;
ALTER TABLE map ADD main_seq integer NOT NULL DEFAULT 0;
ALTER TABLE map RENAME owner TO mediaset_id;
ALTER TABLE map DROP COLUMN description;
ALTER TABLE map DROP COLUMN access;
ALTER TABLE map DROP COLUMN theme;
ALTER TABLE map DROP COLUMN boss;
ALTER TABLE map DROP COLUMN bg1;
ALTER TABLE map DROP COLUMN bg1speed;
ALTER TABLE map DROP COLUMN bg1dir;
ALTER TABLE map DROP COLUMN bg1blink;
ALTER TABLE map DROP COLUMN bg2;
ALTER TABLE map DROP COLUMN bg2speed;
ALTER TABLE map DROP COLUMN bg2dir;
ALTER TABLE map DROP COLUMN bg2blink;
ALTER TABLE map DROP COLUMN bg3;
ALTER TABLE map DROP COLUMN bg3speed;
ALTER TABLE map DROP COLUMN bg3dir;
ALTER TABLE map DROP COLUMN bg3blink;
ALTER TABLE map DROP COLUMN fg1;
ALTER TABLE map DROP COLUMN fg1speed;
ALTER TABLE map DROP COLUMN fg1dir;
ALTER TABLE map DROP COLUMN fg1blink;
ALTER TABLE map DROP COLUMN fg2;
ALTER TABLE map DROP COLUMN fg2speed;
ALTER TABLE map DROP COLUMN fg2dir;
ALTER TABLE map DROP COLUMN fg2blink;
ALTER TABLE map DROP COLUMN fg3;
ALTER TABLE map DROP COLUMN fg3speed;
ALTER TABLE map DROP COLUMN fg3dir;
ALTER TABLE map DROP COLUMN fg3blink;

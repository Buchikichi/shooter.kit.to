-- Table: actor

-- DROP TABLE actor;

CREATE TABLE actor(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	mediaset_id varchar(36) NOT NULL,
	actor_id varchar(36) NOT NULL,
	type integer NOT NULL DEFAULT 0,
	seq bigint NOT NULL DEFAULT 0,
	class_name varchar(32) NOT NULL DEFAULT 'Actor',

	orientation integer NOT NULL DEFAULT 0,
	width integer NOT NULL DEFAULT 0,
	height integer NOT NULL DEFAULT 0,
	region_type integer NOT NULL DEFAULT 0,
	region_size integer NOT NULL DEFAULT 0,
	deg integer NOT NULL DEFAULT 0,
	dir_type integer NOT NULL DEFAULT 0,
	dir_speed integer NOT NULL DEFAULT 100,
	speed numeric NOT NULL DEFAULT 0,
	gravity numeric NOT NULL DEFAULT 0,
	reaction numeric NOT NULL DEFAULT 0,
	hit_point integer NOT NULL DEFAULT 1,
	score integer NOT NULL DEFAULT 0,
	behavior text NOT NULL DEFAULT '',

	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON TABLE actor IS 'プロダクト内アクター';
COMMENT ON COLUMN actor.id IS 'ID';
COMMENT ON COLUMN actor.mediaset_id IS 'Mediaset ID';
COMMENT ON COLUMN actor.type IS '種類';
COMMENT ON COLUMN actor.seq IS '番号';
COMMENT ON COLUMN actor.class_name IS 'クラス名';

COMMENT ON COLUMN actor.orientation IS '向き(水平/垂直)';
COMMENT ON COLUMN actor.width IS '幅';
COMMENT ON COLUMN actor.height IS '高さ';
COMMENT ON COLUMN actor.region_type IS '領域タイプ';
COMMENT ON COLUMN actor.region_size IS '領域サイズ';
COMMENT ON COLUMN actor.deg IS 'degree';
COMMENT ON COLUMN actor.speed IS 'speed';
COMMENT ON COLUMN actor.gravity IS 'gravity';
COMMENT ON COLUMN actor.reaction IS 'reaction';
COMMENT ON COLUMN actor.hit_point IS 'hit point';
COMMENT ON COLUMN actor.score IS 'score';
COMMENT ON COLUMN actor.behavior IS 'behavior';

COMMENT ON COLUMN actor.created IS '作成日';
COMMENT ON COLUMN actor.updated IS '更新日';

ALTER TABLE product_actor RENAME TO actor;
ALTER TABLE actor RENAME product_id TO mediaset_id;
ALTER TABLE actor DROP COLUMN actor_id;
ALTER TABLE actor DROP COLUMN image_id;
ALTER TABLE actor ADD orientation integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD width integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD height integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD region_type integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD region_size integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD deg integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD dir_type integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD dir_speed integer NOT NULL DEFAULT 100;
ALTER TABLE actor ADD speed numeric NOT NULL DEFAULT 0;
ALTER TABLE actor ADD gravity numeric NOT NULL DEFAULT 0;
ALTER TABLE actor ADD reaction numeric NOT NULL DEFAULT 0;
ALTER TABLE actor ADD hit_point integer NOT NULL DEFAULT 1;
ALTER TABLE actor ADD score integer NOT NULL DEFAULT 0;
ALTER TABLE actor ADD behavior text NOT NULL DEFAULT '';

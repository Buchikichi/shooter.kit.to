-- Table: actor

-- DROP TABLE actor;

CREATE TABLE actor(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	actor_id varchar(36) NOT NULL,
	type integer NOT NULL DEFAULT 0,
	seq integer NOT NULL DEFAULT 0,
	class_name varchar(32) NOT NULL DEFAULT 'Actor',
	image_id varchar(36),
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON TABLE actor IS 'プロダクト内アクター';
COMMENT ON COLUMN actor.id IS 'ID';
COMMENT ON COLUMN actor.product_id IS 'プロダクトID';
COMMENT ON COLUMN actor.type IS '種類';
COMMENT ON COLUMN actor.seq IS '番号';
COMMENT ON COLUMN actor.class_name IS 'クラス名';
COMMENT ON COLUMN actor.created IS '作成日';
COMMENT ON COLUMN actor.updated IS '更新日';

ALTER TABLE product_actor RENAME TO actor;
ALTER TABLE actor DROP COLUMN actor_id;
ALTER TABLE actor DROP COLUMN image_id;

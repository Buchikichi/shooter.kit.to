-- Table: product_actor

-- DROP TABLE product_actor;

CREATE TABLE product_actor(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	actor_id varchar(36) NOT NULL,
	type integer  NOT NULL DEFAULT 0,
	seq integer  NOT NULL DEFAULT 0,
	imageId varchar(36),
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN product_actor.id IS 'ID';
COMMENT ON COLUMN product_actor.product_id IS 'プロダクトID';
COMMENT ON COLUMN product_actor.actor_id IS 'アクターID';
COMMENT ON COLUMN product_actor.type IS '種類';
COMMENT ON COLUMN product_actor.seq IS '番号';
COMMENT ON COLUMN product_actor.imageId IS 'イメージID';
COMMENT ON COLUMN product_actor.created IS '作成日';
COMMENT ON COLUMN product_actor.updated IS '更新日';
COMMENT ON TABLE product_actor IS 'プロダクト内アクター';

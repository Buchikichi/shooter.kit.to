-- Table: productActor

-- DROP TABLE productActor;

CREATE TABLE productActor(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	productId varchar(36) NOT NULL,
	actorId varchar(36) NOT NULL,
	type integer  NOT NULL DEFAULT 0,
	seq integer  NOT NULL DEFAULT 0,
	imageId varchar(36) NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN productActor.id IS 'ID';
COMMENT ON COLUMN productActor.productId IS 'プロダクトID';
COMMENT ON COLUMN productActor.actorId IS 'アクターID';
COMMENT ON COLUMN productActor.type IS '種類';
COMMENT ON COLUMN productActor.seq IS '番号';
COMMENT ON COLUMN productActor.imageId IS 'イメージID';
COMMENT ON COLUMN productActor.created IS '作成日';
COMMENT ON COLUMN productActor.updated IS '更新日';

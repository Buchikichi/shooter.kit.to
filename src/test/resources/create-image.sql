-- Table: image

-- DROP TABLE image;

CREATE TABLE image(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	type integer NOT NULL,
	name text NOT NULL,
	description text NOT NULL,
	image text NOT NULL,
	thumb text,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN image.id IS 'ID';
COMMENT ON COLUMN image.owner IS '所有者';
COMMENT ON COLUMN image.access IS 'アクセスレベル{0:private, 1:public}';
COMMENT ON COLUMN image.type IS 'タイプ';
COMMENT ON COLUMN image.name IS '名前';
COMMENT ON COLUMN image.description IS '説明';
COMMENT ON COLUMN image.image IS 'イメージ';
COMMENT ON COLUMN image.thumb IS 'サムネイル';
COMMENT ON COLUMN image.created IS '作成日';
COMMENT ON COLUMN image.updated IS '更新日';

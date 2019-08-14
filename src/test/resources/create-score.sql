-- Table: scores

-- DROP TABLE scores;

CREATE TABLE scores(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	score integer NOT NULL DEFAULT 0,
	name text,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN scores.id IS 'ID';
COMMENT ON COLUMN scores.product_id IS 'プロダクトID';
COMMENT ON COLUMN scores.score IS 'score';
COMMENT ON COLUMN scores.name IS '名前';
COMMENT ON COLUMN scores.created IS '作成日';
COMMENT ON COLUMN scores.updated IS '更新日';
COMMENT ON TABLE scores IS '得点';

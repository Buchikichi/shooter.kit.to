-- Table: productDetail

-- DROP TABLE productDetail;

CREATE TABLE productDetail(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	productId varchar(36) NOT NULL,
	stageId varchar(36) NOT NULL,
	seq integer  NOT NULL DEFAULT 0,
	roll integer  NOT NULL DEFAULT 0,
	map text NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN productDetail.id IS 'ID';
COMMENT ON COLUMN productDetail.productId IS 'プロダクトID';
COMMENT ON COLUMN productDetail.stageId IS 'ステージID';
COMMENT ON COLUMN productDetail.seq IS '順序';
COMMENT ON COLUMN productDetail.roll IS '種類';
COMMENT ON COLUMN productDetail.map IS 'マップ';
COMMENT ON COLUMN productDetail.created IS '作成日';
COMMENT ON COLUMN productDetail.updated IS '更新日';

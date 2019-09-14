-- Table: product_detail

-- DROP TABLE product_detail;

CREATE TABLE product_detail(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	map_id varchar(36) NOT NULL,
	seq integer  NOT NULL DEFAULT 0,
	roll integer  NOT NULL DEFAULT 0,
	map_data text,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN product_detail.id IS 'ID';
COMMENT ON COLUMN product_detail.product_id IS 'プロダクトID';
COMMENT ON COLUMN product_detail.map_id IS 'マップID';
COMMENT ON COLUMN product_detail.seq IS '順序';
COMMENT ON COLUMN product_detail.roll IS '種類';
COMMENT ON COLUMN product_detail.map_data IS 'マップ';
COMMENT ON COLUMN product_detail.created IS '作成日';
COMMENT ON COLUMN product_detail.updated IS '更新日';
COMMENT ON TABLE product_detail IS 'プロダクト詳細';

ALTER TABLE product_detail RENAME stage_id TO map_id;
ALTER TABLE product_detail RENAME map TO map_data;

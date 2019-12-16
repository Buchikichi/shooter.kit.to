-- Table: product_detail

-- DROP TABLE product_detail;

CREATE TABLE product_detail(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	map_id varchar(36) NOT NULL,
	seq integer NOT NULL DEFAULT 0,
	roll integer NOT NULL DEFAULT 0,
	repeat integer NOT NULL DEFAULT 1,
	h_pos integer NOT NULL DEFAULT 0,
	v_pos integer NOT NULL DEFAULT 0,
	start_effect integer NOT NULL DEFAULT 0,
	start_speed integer NOT NULL DEFAULT 0,
	start_audio_type integer NOT NULL DEFAULT -1,
	start_audio_seq integer NOT NULL DEFAULT 0,
	sequel_effect integer NOT NULL DEFAULT 0,
	sequel_speed integer NOT NULL DEFAULT 0,
	sequel_audio_type integer NOT NULL DEFAULT -1,
	sequel_audio_seq integer NOT NULL DEFAULT 0,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN product_detail.id IS 'ID';
COMMENT ON COLUMN product_detail.product_id IS 'プロダクトID';
COMMENT ON COLUMN product_detail.map_id IS 'マップID';
COMMENT ON COLUMN product_detail.seq IS '順序';
COMMENT ON COLUMN product_detail.roll IS 'スクロール種類';
COMMENT ON COLUMN product_detail.repeat IS 'リピート';
COMMENT ON COLUMN product_detail.h_pos IS '開始位置H';
COMMENT ON COLUMN product_detail.v_pos IS '開始位置V';
COMMENT ON COLUMN product_detail.start_effect IS '開始エフェクト';
COMMENT ON COLUMN product_detail.start_speed IS '開始エフェクト速度';
COMMENT ON COLUMN product_detail.start_audio_type IS '開始オーディオタイプ';
COMMENT ON COLUMN product_detail.start_audio_seq IS '開始オーディオ番号';
COMMENT ON COLUMN product_detail.sequel_effect IS '続きエフェクト';
COMMENT ON COLUMN product_detail.sequel_speed IS '続きエフェクト速度';
COMMENT ON COLUMN product_detail.sequel_audio_type IS '続きオーディオタイプ';
COMMENT ON COLUMN product_detail.sequel_audio_seq IS '続きオーディオ番号';
COMMENT ON COLUMN product_detail.created IS '作成日';
COMMENT ON COLUMN product_detail.updated IS '更新日';
COMMENT ON TABLE product_detail IS 'プロダクト詳細';

ALTER TABLE product_detail RENAME stage_id TO map_id;
ALTER TABLE product_detail DROP COLUMN map;

ALTER TABLE product_detail ADD repeat integer NOT NULL DEFAULT 1;
ALTER TABLE product_detail ADD h_pos integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD v_pos integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD start_effect integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD start_speed integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD start_audio_type integer NOT NULL DEFAULT -1;
ALTER TABLE product_detail ADD start_audio_seq integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD sequel_effect integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD sequel_speed integer NOT NULL DEFAULT 0;
ALTER TABLE product_detail ADD sequel_audio_type integer NOT NULL DEFAULT -1;
ALTER TABLE product_detail ADD sequel_audio_seq integer NOT NULL DEFAULT 0;

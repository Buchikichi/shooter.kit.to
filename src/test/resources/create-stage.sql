-- Table: stage

-- DROP TABLE stage;

CREATE TABLE stage(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	product_id varchar(36) NOT NULL,
	map_id varchar(36) NOT NULL,
	seq integer NOT NULL DEFAULT 0,
	roll integer NOT NULL DEFAULT 0,
	repeat integer NOT NULL DEFAULT 1,
	pos_h integer NOT NULL DEFAULT 0,
	pos_v integer NOT NULL DEFAULT 0,
	start_transition integer NOT NULL DEFAULT 0,
	start_speed integer NOT NULL DEFAULT 0,
	start_audio_seq bigint NOT NULL DEFAULT 0,
	sequel_transition integer NOT NULL DEFAULT 0,
	sequel_speed integer NOT NULL DEFAULT 0,
	sequel_audio_seq bigint NOT NULL DEFAULT 0,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN stage.id IS 'ID';
COMMENT ON COLUMN stage.product_id IS 'プロダクトID';
COMMENT ON COLUMN stage.map_id IS 'マップID';
COMMENT ON COLUMN stage.seq IS '順序';
COMMENT ON COLUMN stage.roll IS 'スクロール種類';
COMMENT ON COLUMN stage.repeat IS 'リピート';
COMMENT ON COLUMN stage.pos_h IS '開始位置H';
COMMENT ON COLUMN stage.pos_v IS '開始位置V';
COMMENT ON COLUMN stage.start_transition IS '開始エフェクト';
COMMENT ON COLUMN stage.start_speed IS '開始エフェクト速度';
COMMENT ON COLUMN stage.start_audio_seq IS '開始オーディオ番号';
COMMENT ON COLUMN stage.sequel_transition IS '続きエフェクト';
COMMENT ON COLUMN stage.sequel_speed IS '続きエフェクト速度';
COMMENT ON COLUMN stage.sequel_audio_seq IS '続きオーディオ番号';
COMMENT ON COLUMN stage.created IS '作成日';
COMMENT ON COLUMN stage.updated IS '更新日';
COMMENT ON TABLE stage IS 'プロダクト詳細';

ALTER TABLE product_detail RENAME TO stage;
ALTER TABLE stage RENAME stage_id TO map_id;
ALTER TABLE stage DROP COLUMN map;

ALTER TABLE stage ADD repeat integer NOT NULL DEFAULT 1;
ALTER TABLE stage ADD pos_h integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD pos_v integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD start_transition integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD start_speed integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD start_audio_seq bigint NOT NULL DEFAULT 0;
ALTER TABLE stage ADD sequel_transition integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD sequel_speed integer NOT NULL DEFAULT 0;
ALTER TABLE stage ADD sequel_audio_seq bigint NOT NULL DEFAULT 0;

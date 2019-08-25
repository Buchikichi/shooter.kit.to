-- Table: visual

-- DROP TABLE visual;

CREATE TABLE IF NOT EXISTS visual(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	mediaset_id varchar(36) NOT NULL,
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	visual_type integer NOT NULL,
	visual_seq integer NOT NULL,
	orientation char(1) NOT NULL DEFAULT 'V',
	name text NOT NULL,
	image text NOT NULL,
	hash varchar(64) NOT NULL,
	content_type text NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN visual.id IS 'ID';
COMMENT ON COLUMN visual.mediaset_id IS 'メディアセットID';
COMMENT ON COLUMN visual.owner IS '所有者';
COMMENT ON COLUMN visual.access IS 'アクセスレベル{0:private, 1:public}';
COMMENT ON COLUMN visual.visual_type IS 'タイプ';
COMMENT ON COLUMN visual.visual_seq IS '順序';
COMMENT ON COLUMN visual.orientation IS '向き{V:vertical, H:horizontal}';
COMMENT ON COLUMN visual.name IS '名前';
COMMENT ON COLUMN visual.image IS 'イメージ';
COMMENT ON COLUMN visual.hash IS 'ハッシュ値';
COMMENT ON COLUMN visual.content_type IS '種別';
COMMENT ON COLUMN visual.created IS '作成日';
COMMENT ON COLUMN visual.updated IS '更新日';

ALTER TABLE image RENAME TO visual;
ALTER TABLE visual DROP COLUMN description CASCADE;
ALTER TABLE visual RENAME type TO visual_type;
ALTER TABLE visual ADD mediaset_id varchar(36) NOT NULL DEFAULT '';
ALTER TABLE visual ADD visual_seq integer NOT NULL DEFAULT 0;
ALTER TABLE visual ADD orientation char(1) NOT NULL DEFAULT 'V';
ALTER TABLE visual ADD hash varchar(64) NOT NULL DEFAULT '';

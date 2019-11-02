-- Table: map_visual

-- DROP TABLE map_visual;

CREATE TABLE map_visual(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	map_id varchar(36) NOT NULL,
	seq integer NOT NULL,
	visual_type integer NOT NULL,
	visual_seq integer NOT NULL,
	repeat integer NOT NULL,
	radian real NOT NULL,
	speed real NOT NULL,
	blink real NOT NULL,
	PRIMARY KEY (id)
);
COMMENT ON COLUMN map_visual.id IS 'ID';
COMMENT ON COLUMN map_visual.map_id IS 'マップID';
COMMENT ON COLUMN map_visual.seq IS '順序';
COMMENT ON COLUMN map_visual.visual_type IS '画像タイプ';
COMMENT ON COLUMN map_visual.visual_seq IS '画像番号';
COMMENT ON COLUMN map_visual.repeat IS 'リピート';
COMMENT ON COLUMN map_visual.radian IS '角度';
COMMENT ON COLUMN map_visual.speed IS '速度';
COMMENT ON COLUMN map_visual.blink IS 'ブリンク';

ALTER TABLE map_visual RENAME COLUMN x TO repeat;
ALTER TABLE map_visual DROP COLUMN y;

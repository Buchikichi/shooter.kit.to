-- Table: map_visual

-- DROP TABLE map_visual;

CREATE TABLE map_visual(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	map_id varchar(36) NOT NULL,
	seq integer NOT NULL,
	visual_type integer NOT NULL,
	visual_seq integer NOT NULL,
	x integer NOT NULL,
	y integer NOT NULL,
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
COMMENT ON COLUMN map_visual.x IS 'X位置';
COMMENT ON COLUMN map_visual.y IS 'Y位置';
COMMENT ON COLUMN map_visual.radian IS '角度';
COMMENT ON COLUMN map_visual.speed IS '速度';
COMMENT ON COLUMN map_visual.blink IS 'ブリンク';

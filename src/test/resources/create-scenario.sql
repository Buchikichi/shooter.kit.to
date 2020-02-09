-- Table: scenario

-- DROP TABLE scenario;

CREATE TABLE scenario(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	stage_id varchar(36) NOT NULL,
	v integer NOT NULL,
	h integer NOT NULL,
	target char(1) NOT NULL,
	type integer NOT NULL DEFAULT 0,
	number integer NOT NULL DEFAULT 0,
	op text NOT NULL,
	PRIMARY KEY (id)
);
COMMENT ON COLUMN scenario.id IS 'ID';
COMMENT ON COLUMN scenario.stage_id IS 'ステージID';
COMMENT ON COLUMN scenario.v IS 'Vertical point';
COMMENT ON COLUMN scenario.h IS 'Horizontal point';
COMMENT ON COLUMN scenario.target IS 'ターゲット';
COMMENT ON COLUMN scenario.type IS 'タイプ';
COMMENT ON COLUMN scenario.number IS '番号';
COMMENT ON COLUMN scenario.op IS '操作';

ALTER TABLE scenario ADD type integer NOT NULL DEFAULT 0;

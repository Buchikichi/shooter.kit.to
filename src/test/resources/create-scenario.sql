-- Table: scenario

-- DROP TABLE scenario;

CREATE TABLE scenario(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	stage_id varchar(36) NOT NULL,
	v integer NOT NULL,
	h integer NOT NULL,
	op text NOT NULL,
	target char(1) NOT NULL,
	type integer NOT NULL DEFAULT 0,
	number bigint NOT NULL DEFAULT 0,
	formation_id varchar(36),
	belongings bigint NOT NULL DEFAULT 0,
	PRIMARY KEY (id)
);
COMMENT ON COLUMN scenario.id IS 'ID';
COMMENT ON COLUMN scenario.stage_id IS 'Stage ID';
COMMENT ON COLUMN scenario.v IS 'Vertical point';
COMMENT ON COLUMN scenario.h IS 'Horizontal point';
COMMENT ON COLUMN scenario.target IS 'ターゲット';
COMMENT ON COLUMN scenario.type IS 'タイプ';
COMMENT ON COLUMN scenario.number IS '番号';
COMMENT ON COLUMN scenario.op IS '操作';
COMMENT ON COLUMN scenario.formation_id IS 'Formation ID';
COMMENT ON COLUMN scenario.belongings IS '所持品';

ALTER TABLE scenario ADD type integer NOT NULL DEFAULT 0;
ALTER TABLE scenario ADD formation_id varchar(36);
ALTER TABLE scenario ADD belongings bigint NOT NULL DEFAULT 0;
--ALTER TABLE scenario DROP COLUMN target;
--ALTER TABLE scenario DROP COLUMN type;

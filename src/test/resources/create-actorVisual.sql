-- Table: actor_visual

-- DROP TABLE actor_visual;

CREATE TABLE actor_visual(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	actor_id varchar(36) NOT NULL,
	seq integer  NOT NULL DEFAULT 0,
	visual_seq bigint NOT NULL DEFAULT 0,
	dir_type integer NOT NULL DEFAULT 0,
	dir_speed integer NOT NULL DEFAULT 0,

	anim text,
	properties text,
	routine text,
	method text,
	script text,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON TABLE actor_visual IS 'アクター画像';
COMMENT ON COLUMN actor_visual.id IS 'ID';
COMMENT ON COLUMN actor_visual.actor_id IS 'アクターID';
COMMENT ON COLUMN actor_visual.seq IS '順序';
COMMENT ON COLUMN actor_visual.visual_seq IS '画像番号';

COMMENT ON COLUMN actor_visual.anim IS 'anim';
COMMENT ON COLUMN actor_visual.properties IS 'プロパティ';
COMMENT ON COLUMN actor_visual.routine IS 'routine';
COMMENT ON COLUMN actor_visual.method IS 'method';
COMMENT ON COLUMN actor_visual.script IS 'script';
COMMENT ON COLUMN actor_visual.created IS '作成日';
COMMENT ON COLUMN actor_visual.updated IS '更新日';

ALTER TABLE actor RENAME TO actor_visual;
ALTER TABLE actor_visual RENAME owner TO actor_id;
ALTER TABLE actor_visual RENAME access TO seq;
ALTER TABLE actor_visual DROP COLUMN name;
ALTER TABLE actor_visual DROP COLUMN description;
ALTER TABLE actor_visual DROP COLUMN imageId;
ALTER TABLE actor_visual RENAME type TO visual_seq;
ALTER TABLE actor_visual ADD dir_type integer NOT NULL DEFAULT 0;
ALTER TABLE actor_visual ADD dir_speed integer NOT NULL DEFAULT 0;

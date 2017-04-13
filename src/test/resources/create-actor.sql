-- Table: actor

-- DROP TABLE actor;

CREATE TABLE actor(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	description text NOT NULL,
	imageId varchar(36) NOT NULL,
	anim text,
	properties text,
	routine text,
	method text,
	script text,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN actor.id IS 'ID';
COMMENT ON COLUMN actor.owner IS '所有者';
COMMENT ON COLUMN actor.access IS 'アクセスレベル{0:private, 1:public}';
COMMENT ON COLUMN actor.name IS '名前';
COMMENT ON COLUMN actor.description IS '説明';
COMMENT ON COLUMN actor.imageId IS 'Image ID';
COMMENT ON COLUMN actor.anim IS 'anim';
COMMENT ON COLUMN actor.properties IS 'プロパティ';
COMMENT ON COLUMN actor.routine IS 'routine';
COMMENT ON COLUMN actor.method IS 'method';
COMMENT ON COLUMN actor.script IS 'script';
COMMENT ON COLUMN actor.created IS '作成日';
COMMENT ON COLUMN actor.updated IS '更新日';

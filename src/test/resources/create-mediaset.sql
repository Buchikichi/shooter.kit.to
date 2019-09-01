-- Table: mediaset

-- DROP TABLE mediaset;

CREATE TABLE IF NOT EXISTS mediaset(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	description text NOT NULL,
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN mediaset.id IS 'ID';
COMMENT ON COLUMN mediaset.owner IS '所有者';
COMMENT ON COLUMN mediaset.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN mediaset.name IS '名前';
COMMENT ON COLUMN mediaset.description IS '説明';
COMMENT ON COLUMN mediaset.created IS '作成日';
COMMENT ON COLUMN mediaset.updated IS '更新日';

INSERT INTO mediaset(id, owner, name, description) VALUES('4eabd610-1c60-4d87-8ff4-6cf09d903da9', 'SYSTEM', 'Horizontal', 'Horizontal scrolling shooter template.');
INSERT INTO mediaset(id, owner, name, description) VALUES('f67392be-a9c5-4570-b6f4-bf396cafa44c', 'SYSTEM', 'Vertical', 'Vertical scrolling shooter template.');

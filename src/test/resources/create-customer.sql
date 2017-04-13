-- Table: customer

-- DROP TABLE customer;

CREATE TABLE customer(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	userid varchar(128) NOT NULL,
	name text NOT NULL,
	description text NOT NULL,
	email text NOT NULL,
	password varchar(64) NOT NULL,
	logon date NOT NULL DEFAULT now(),
	created date NOT NULL DEFAULT now(),
	updated date NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN customer.id IS 'ID';
COMMENT ON COLUMN customer.userid IS 'ユーザーID';
COMMENT ON COLUMN customer.name IS '名前';
COMMENT ON COLUMN customer.description IS '説明';
COMMENT ON COLUMN customer.email IS 'メールアドレス';
COMMENT ON COLUMN customer.password IS 'SHA256';
COMMENT ON COLUMN customer.logon IS 'logon';
COMMENT ON COLUMN customer.created IS '作成日';
COMMENT ON COLUMN customer.updated IS '更新日';

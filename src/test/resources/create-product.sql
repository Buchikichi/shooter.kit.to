-- Table: product

-- DROP TABLE product;

CREATE TABLE product(
	id varchar(36) NOT NULL DEFAULT gen_random_uuid(),
	owner varchar(36) NOT NULL,
	access integer  NOT NULL DEFAULT 0,
	name text NOT NULL,
	description text NOT NULL,
	icon text,
	width integer NOT NULL DEFAULT 256,
	height integer NOT NULL DEFAULT 224,
	count integer NOT NULL DEFAULT 0,
	mediaset_id varchar(36) NOT NULL,
	crash_scroll integer NOT NULL DEFAULT 0,
	crash_bgm integer NOT NULL DEFAULT 0,
	crash_player integer NOT NULL DEFAULT 0,
	created timestamp NOT NULL DEFAULT now(),
	updated timestamp NOT NULL DEFAULT now(),
	PRIMARY KEY (id)
);
COMMENT ON COLUMN product.id IS 'ID';
COMMENT ON COLUMN product.owner IS '所有者';
COMMENT ON COLUMN product.access IS 'アクセスレベル{0:private, 1:protected, 2:public}';
COMMENT ON COLUMN product.name IS '名前';
COMMENT ON COLUMN product.description IS '説明';
COMMENT ON COLUMN product.icon IS 'アイコン';
COMMENT ON COLUMN product.width IS '幅';
COMMENT ON COLUMN product.height IS '高さ';
COMMENT ON COLUMN product.count IS 'カウント';
COMMENT ON COLUMN product.mediaset_id IS 'メディアセットID';
COMMENT ON COLUMN product.crash_scroll IS '衝突時スクロール';
COMMENT ON COLUMN product.crash_bgm IS '衝突時BGM';
COMMENT ON COLUMN product.crash_player IS '衝突時プレイヤー';
COMMENT ON COLUMN product.created IS '作成日';
COMMENT ON COLUMN product.updated IS '更新日';

ALTER TABLE product ADD mediaset_id varchar(36) NOT NULL DEFAULT '';
ALTER TABLE product ADD crash_scroll integer NOT NULL DEFAULT 0;
ALTER TABLE product ADD crash_bgm integer NOT NULL DEFAULT 0;
ALTER TABLE product ADD crash_player integer NOT NULL DEFAULT 0;

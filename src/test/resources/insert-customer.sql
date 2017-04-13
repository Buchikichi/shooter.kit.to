TRUNCATE TABLE customer;
INSERT INTO customer(id, userid, name, description, email, password) values('SYSTEM', 'system', 'システム管理者', '', 'SYSTEM', encode(digest('salt'||'passwd', 'sha256'), 'hex'));

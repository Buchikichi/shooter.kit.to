-- イメージひな形
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Battery', 'Battery', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'BatteryBase', 'BatteryBase', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Bouncer', 'Bouncer', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Charger', 'Charger', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Crab', 'Crab', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'DragonBody', 'DragonBody', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'DragonHead', 'DragonHead', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Hanker', 'Hanker', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Hatch', 'Hatch', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Jerky', 'Jerky', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Juno', 'Juno', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Slur', 'Slur', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Tentacle', 'Tentacle', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'TentacleHead', 'TentacleHead', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'TentacleJoint', 'TentacleJoint', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Twister', 'Twister', '');
insert into image(owner, access, type, name, description, image) values('system', 2, 1, 'Waver', 'Waver', '');
-- アクターひな形
truncate table actor;
insert into actor(owner, access, name, description, imageid)
	select owner, access, name, description, id from image where type=1;

-- プロダクト
INSERT INTO product(name, description, owner) values('Prototype-A', 'This is prototype pattern A.', 'SYSTEM');
INSERT INTO product(name, description, owner) values('Prototype-B', 'This is prototype pattern B.', 'SYSTEM');
INSERT INTO product(name, description, owner) values('Prototype-C', 'This is prototype pattern C.', 'SYSTEM');

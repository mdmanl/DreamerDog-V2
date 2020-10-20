CREATE TABLE warnings 
(
  ID int(11) NOT NULL AUTO_INCREMENT,
  memberID varchar(50) NOT NULL DEFAULT '0',
  reason varchar(200) NOT NULL DEFAULT '0',
  expiryDate bigint(255) DEFAULT NULL,
  admin varchar(200) NOT NULL DEFAULT '0',
  activeWarns varchar(5) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
);

CREATE TABLE users 
(
  id int(11) NOT NULL AUTO_INCREMENT,
  memberID varchar(50) NOT NULL DEFAULT '0',
  bio varchar(50) NOT NULL DEFAULT '0',
  hideBio varchar(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
);

CREATE TABLE stats 
(
  id int(11) NOT NULL AUTO_INCREMENT,
  warns varchar(200) NOT NULL DEFAULT '0',
  bans varchar(200) NOT NULL DEFAULT '0',
  kicks varchar(200) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
);

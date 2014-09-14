SET NAMES utf8;

DROP DATABASE hiwifi;
CREATE DATABASE hiwifi;

USE hiwifi;
CREATE TABLE users(
	id INT(10) NOT NULL AUTO_INCREMENT,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(20) NOT NULL,
	tel VARCHAR(20) NOT NULL,
	secret VARCHAR(20) NOT NULL,
	PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users(username,password,tel,secret) VALUES('test','test','18930175276','Wangju520');

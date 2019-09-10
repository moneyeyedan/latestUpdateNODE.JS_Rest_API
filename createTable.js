var connect = require('./databaseConnection');
connect.connect.query('create table user (id int NOT NULL AUTO_INCREMENT,firstName varchar(255),lastName varchar(255),degree varchar(255),course varchar(255),age int,PRIMARY KEY (id))');

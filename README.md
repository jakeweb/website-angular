# website-angular
Single page application on AngularJS

Installation local PostgreSQL

Download postgreSQL http://www.enterprisedb.com/products-services-training/pgdownload
Install postgreSQL
login to postgres console and create database "db-angular":
CREATE DATABASE db-angular;
restore dump by running the following command:
add environment variable EM_PG_CONN with the following content:
postgres://postgres-user-name : password @127.0.0.1/db-angular
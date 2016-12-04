**Single page application on AngularJS/NodeJS/PostrgeSQL**

## Installation:

* Clone the project: git clone  https://github.com/jakeweb/website-angular.git
* Navigate to the project folder
* Install node modules by running `npm install`
* Install bower components by running `bower install`
* Launch the project locally by running the following command: `npm start`

##Installation local PostgreSQL

* Download postgreSQL http://www.enterprisedb.com/products-services-training/pgdownload
* Install postgreSQL
* login to postgres console and create database "db-abgular":
* CREATE DATABASE db-angular;
* Also, you can create database via pgAdmin - PostgreSQL administration and management tools

* restore dump by running the following command:
* `psql -U postgres-user-name db-angular < path/to/database/dump.sql`
* where
* `postgres-user-name` - your postres user name
* `db-angular` - your database name
* `path/to/database/dump.sql` - path to sql build file

* add environment variable `EM_PG_CONN` with the following content:
* `postgres://postgres-user-name : password @127.0.0.1/db-angular`
* where
* `postgres-user-name` - your postres user name
* `password` - password for this user name
* `db-angular` - the name of database
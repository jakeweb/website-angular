---- database
--create database "db-angular";
--\c "db-angular";

--types

--tables
create table "users"(
  "id" serial primary key,
  "password" varchar not null,
  "email" varchar unique not null
);
create table "products"(
  "id" serial primary key,
  "title" varchar not null
);
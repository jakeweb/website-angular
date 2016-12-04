---- database
--create database "db-angular";
--\c "db-angular";

--types

--tables
create table "users"(
  "id" serial primary key,
  "email" varchar unique not null,
  "password" varchar not null,
  "firstName" varchar,
  "lastName" varchar,
  "phone" varchar
);
create table "products"(
  "id" serial primary key,
  "title" varchar not null,
  "price" real not null,
  "description" varchar not null,
  "deleted" boolean default false
);
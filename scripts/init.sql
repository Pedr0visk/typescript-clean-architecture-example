-- drop table if exists [database]

create table if not exists attributes (
  id varchar(128) not null unique,
  account_id integer not null,
  name varchar(255) not null,
  value varchar(255) not null,
  primary key(id)
);


insert into attributes(id, account_id, name, value)
values
  ('877b9cda-3ede-41ee-bdb9-6e41e82a05de', 1, 'email', 'jonh.doe@navegg.com'),
  ('477e3eae-1289-4182-bad6-3f1cd1a6825c', 1, 'name', 'jonh doe'),
  ('30e49d4b-ee59-4b77-b9cf-a3a1497c8bcb', 1, 'job', 'full stack developer'),
  ('0d652683-a410-46fc-8440-822236759803', 2, 'email', 'peter.parker@navegg.com'),
  ('f98cfcc6-2957-4c14-b4dd-c8435563c0dd', 2, 'name', 'peter parker'),
  ('af336492-b1d1-4974-a9d5-35c69b761668', 2, 'age', '22')

create table if not exists Towns(
	id serial not null primary key,
	town_name text not null
	
);

create table if not exists registrationNumber(
	id serial not null primary key,
	town_id  integer not null, 
	FOREIGN KEY(town_id) references Towns(id),
	reg_number varchar(225) not null

);
insert into Towns(town_name) values('CY'),('CA'),('CJ'),('CK');


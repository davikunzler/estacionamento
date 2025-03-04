create database estacionamento;
use estacionamento;
 
create table cars (
name varchar(255) not null,
placa varchar(255) not null,
modelo varchar(255) not null,
cpf CHAR(11) not null);
 
drop table cars;
 
DESCRIBE cars;
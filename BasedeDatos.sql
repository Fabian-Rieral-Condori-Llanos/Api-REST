create database apirest

CREATE TABLE usuario(
	id serial PRIMARY KEY,
	nombre VARCHAR(50) NOT NULL,
	primer_apellido VARCHAR(50) NOT NULL,
	segundo_apellido VARCHAR(50) NOT NULL,
	fecha_nacimiento date
);
CREATE TABLE estado(
	nameSystem VARCHAR(50) NOT NULL,
	version VARCHAR(25) NOT NULL,
	developer VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT null
);

INSERT INTO estado(nameSystem,version,developer,email)
	VALUES('api-users','0.0.1','Fabian Rieral Condori LLanos','fabiancondori9@gmail.com')

INSERT INTO usuario (nombre, primer_apellido, segundo_apellido, fecha_nacimiento)
VALUES
	('Juan', 'Pérez', 'Gómez', '1990-01-15'),
	('María', 'López', 'García', '1985-06-25'),
	('Pedro', 'González', 'Martínez', '1995-09-10'),
	('Ana', 'Sánchez', 'Rodríguez', '1992-03-12'),
	('Luis', 'Hernández', 'Torres', '1988-11-30'),
	('Laura', 'Gutiérrez', 'Vargas', '1997-07-18'),
	('Carlos', 'Jiménez', 'Luna', '1994-05-09'),
	('Sofía', 'Morales', 'Díaz', '1991-09-22'),
	('Javier', 'Ortega', 'Navarro', '1993-12-05'),
	('Elena', 'Ruiz', 'Ramírez', '1987-08-14'),
	('Diego', 'Silva', 'Flores', '1996-02-28'),
	('Paula', 'Castillo', 'Ramos', '1998-04-16'),
	('Andrés', 'Vargas', 'Mendoza', '1999-10-07'),
	('Valentina', 'Torres', 'Guerrero', '1991-07-02'),
	('Gabriel', 'Cruz', 'Soto', '1989-11-23');


SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)))::numeric, 2) AS promedio_edades FROM usuario

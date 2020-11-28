//TODO RESUMEN MYQL (BASE DE DATOS)

//Todo 1. Estructura de Tablas
//* 1. Entidades
// Serán la representación de un objeto o cosa de la vida real. Los representamos (en el diagrama) usando un rectángulo.
//Para el nombre de las tablas usamos sustantivos en PLURAL

//* 2. Atributos
// Son las características que van a definir a cada entidad. (Ej: título, raiting, fecha_estreno, pais etc)

//* 3. Clave Primaria (Primary Key)
// Es un campo (o una combinación de campos) que identifica a CADA FILA dentro de una tabla de FORMA ÚNICA (no pueden haber dos filas con el mismo PK)
//& NOTA: No es obligatorio tener una pero es muy recomendable, así cada fila dentro de una tabla tiene cierta unicidad.
// Para identificar la clave primaria podemos escribir  el atributo en negrita seguido de las iniciales PK entre paréntesis (PK)
// Los ID son siempre positivos y autoincrementativos. No pueden haber 2 iguales.

//Todo 2. Relaciones
// Las relaciones indican cómo se van a relacionar dos tablas.
// Existen 3 tipos de relaciones:

//* 1. Uno a Uno (1:1):
// Un usuario tiene sólo una dirección. Una dirección pertenece sólo a un usuario.
// Para establecer la relación colocamos la clave primaria de la dirección en la tabla de usuarios (por ejemplo), indicando que esa dirección está asociada a ese usuario.

//* 2. Uno a Muchos (1:M)
// Un cliente puede tener muchas tarjetas. Una tarjeta pertenece a un sólo cliente.
//Para establecer la relación colocamos la clave primaria del cliente en la tabla de tarjetas, indicando que esa tarjeta esá asociada a un usuario en particular.

//* 3. Muchos a muchos (M:M)
// Un cliente puede comprar muchos productos. Un producto puede ser comprado por muchos clientes.
// Cuando tengo una relación de muchos con muchos -> debo crear una tabla intermedia relacionando ambas claves (PK).
// Esta tabla intermedia (Tabla pivot) tiene como mínimo 3 datos: una clave primaria (PK) + dos claves foráneas (FK)

//Todo 3. Tipos de Datos
//* 1. Numéricos SIN DECIMALES
// - TINYINT: -128 a 128, 0 a 255
// - SMALLINT: -32789 a 32767, 0 a 65535
// - MEDIUMINT: -8388608 a 8388607, 0 a 16777215
// - INT: -2147483648 to 214748364, 0 a 4294967295
// - BIGINT: 9223372036854775808 a 9223372036854775807, 0 a 18446744073709551615

//* 2. Numéricos CON DECIMALES
// - FLOAT: Permite almacenar pequeños números decimales.
// - DOUBLE: Permite almacenar grandes números decimales.
// - DECIMAL: Permite almacenar grandes números decimales de punto fijo.

//* 3. Booleans
// MySQL guarda los booleanos por detrás como un CERO o como un UNO.
//& NOTA: por cuestiones de performance, no se recomienda utilizar este tipo de dato en MySQL.
// En caso de querer guardar valores "verdaderos" o "falsos" podemos usar el tipo de dato TINYINT y usar el 0 para representar el FALSE y el 1 para representar el TRUE

//* 4. Texto
// - CHAR(num): determina la cantidad exacta de caracteres.
// - VARCHAR(num): determina la cantidad máxima de caracteres.
// - TEXT: Determina un tipo de texto sin límite de caracteres (se usa para un post de blog, por ejemplo)

//* 5. Fecha
// MySQL no comprueba de una manera estricta si la fecha es válida o no.

// - DATE: Almacena la fecha en formato YYYY-MM-DD
// - TIME: Almacena la hora en formato HH:MM:SS
// -DATETIME: Se almacena como YYYY-MM-DD HH:MM:SS

//* 6. Constraints
// - UNIQUE KEYS: Es una restricción que solo permite valores únicos para uno (o múltiples) campos.
// - NULL / NOTNULL: NULL significa que el valor para ese campo no existe o no se conoce. NULL no es vacío ' ' ni cero 0. Cuando ponemos NOTNULL estamos diciendo que el valor no puede ser nulo.
// - DEFAUL: Se usa para definir un valor por defecto para una columna. Este valor se le va a agregar a cada registro nuevo siempre y cuando no se especifique otro valor que lo sobreescriba.
// - AUTO_INCREMENT: Genera un número único y lo incrementa automáticamente con cada nuevo registro de la tabla. Se suele usar a menudo para el campo ID.

//Todo 4. Creación de Tablas
// para crear tablas usamos el comando CREATE TABLE, especificando sus columnas, sus tipos y sus constraints.

CREATE TABLE nombre_de_la_tabla (
    nombre_de_columna_1 TIPO_DE_DATO CONSTRAINT,
    nombre_de_columna_2 TIPO_DE_DATO CONSTRAINT
);

// Ejemplo: 
CREATE TALE post (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR (200),
);

//Todo 5. Modificación de Tablas
//* DROP TABLE: 
// Borrará toda la tabla que le especifiquemos en la sentencia
// Ejemplo:

DROP TABLE IF EXIST movies;

//* ALTER TABLE:
// Permite alterar una tabla ya existente. Opera con tres comandos:
//  - ADD: para agregar una columna.
//  - MODIFY: para modificar una columna.
//  - DROP: para borrar una columna.

// Ejemplo:
ALTER TABLE nombre_de_la_tabla
ADD columna3 TIPO_DE_DATO [FIRST|AFTER columna2]
MODIFY NUEVO_TIPO_DATO
DROP columna4;

ALTER TABLE movies
ADD rating DECIMAL(3,1) UNSIGNED NOT NULL; //Agrega la columna rating, aclarando tipo de dato y constraint.

ALTER TABLE movies
MODIFY rating DECIMAL(4,1) UNSIGNED NOT NULL; // Modifica el decimal de la columna rating. Aunque el resto de las configuraciones de la tabla no se modifiquen, es necesario escribirlas en la sentencia.

ALTER TABLE movies
DROP rating; // Borra la columna rating.

//* INSERT:
// Existen 2 formas de agregar datos en una tabla:
//  1) Insertando datos en TODAS las COLUMNAS.
// Si estamos insertando datos en todas las columnas, no hace falta aclarar los nombres de cada columna. Sin embargo, el orden en el que insertemos los valores, deberá ser el mismo orden que tengan asignadas las columnas en la tabla.

// Ejemplo:

INSERT INTO table_name (columna_1, columna_2, columna_3, ...)
VALUES (valor_1, valor_2, valor_3, ...);

INSERT INTO usuarios (id, nombre, apellido,)
VALUES (DEFAULT, 'Diego', 'Díaz');

INSERT INTO usuarios
VALUES (DEFAULT, 'Diego', 'Díaz');

//  2) Insertando datos en las columnas que especifiquemos:
// Para insertar datos en una columna en específico, aclaramos la tabla y luego escribimos el nombre de la o las columnas entre los paréntesis. 

INSERT INTO usuarios (nombre)
VALUES ('Santi');

INSERT INTO peliculas (duracion, titulo)
VALUES (112, 'kill Bill');

//* DELETE:
// Con DELETE podemos borrar información de una tabla.
//! IMPORTANTE: utilizar siempre WHERE en la sentencia para agregar la condición de cuáles son las filas que queremos eliminear. Sino borramos TODA LA TABLA.

DELETE FROM nombre_tabla WHERE condicion;

DELETE FROM usuarios WHERE usuario_id = 4;

//* UPDATE:
// UPDATE modificará los registros existentes de una tabla. Al igual que con DELETE, es importante no olvidar el WHERE cuando escribimos la sentencia, aclarando la condición.

UPDATE nombre_tabla
SET columna_1 = valor_1, columna_2 = valor_2, ...
WHERE condicion;

UPDATE usuarios
SET nombre = 'Alfredo', apellido = 'Caseros'
WHERE id = 1;

//Todo 6. Consultas a la Base de Datos
//* 1. SELECT:
// Toda consulta empieza con la palabra SELECT -> realiza consulta sobre una o varias columnas de una tabla.
// Para especificar sobre qué TABLA queremos realizar esa consulta usamos FROM seguido del nomrbre de la tabla.

SELECT nombre_de_columna_1, nombre_de_columna_2, ...
FROM nombre_tabla;

// Ejemplo:
SELECT titulo, raiting 
FORM peliculas;

//* 2. WHERE:
// WHERE sirve para condicionar y filtrar las consultas SELECT

SELECT nombre_de_columna_1, nombre_de_columna_2, ...
FROM nombre_tabla
WHERE condicion;

// Ejemplo:
SELECT nombre, edad
FROM usuarios
WHERE edad > 17; 

// ORDENADORES: 
//  - = Igual a, > mayor que, >= mayor o igual que, < menor que, <= menor o igual que, <> diferente a, =! diferente a.
//  - IS NULL (es nulo), BETWEEN (entre dos valores), IN (lista de valores), LIKE (Se ajusta a...)

// Ejemplo:
SELECT *
FROM movies
WHERE release_date > '2000-01-01'

SELECT *
FROM movies
WHERE title LIKE "Avatar"

o

WHERE awards >=3 AND awards < 8

o

DELET FROM usuarios 
WHERE id = 2; //! MUY IMPORTANTE EL WHERE

//* 3. ORDER BY:
// Se utiliza para ordenar los resultados de una consutla SEGÚN EL VALOR DE LA COLUMNA ESPECIFICADA. Podemos ordenar los datos de forma ASCENDENTE (ASC) o DESCENDENTE (DESC)

SELECT nombre_de_columna_1, nombre_de_columna_2
FORM tabla
WHERE condicion
ORDER BY nombre_de_columna_1

// Ejemplo:
SELECT nombre,edad
FROM usuarios
WHERE edad > 21
ORDER BY nombre DESC;

//* 4. LIMIT:
// SIrve para limitar el número de filas (registros/resultados) devueltas en un consulta SELECT
// También establece un número máximo de registros a eliminar con DELETE

SELECT nombre_de_columna_1, nombre_de_columna_2
FORM tabla
LIMIT cantidad_de_registros;

// Ejemplo:

SELECT *
FROM peliculas
WHERE premios > 4
LIMIT 10;

//* 5. OFFSET:
// Nos permite especificar a partir de qué fila comenzar la recuperación de los datos especificados.

SELECT nombre_de_columna_1, nombre_de_columna_2
FORM tabla
LIMIT cantidad_de_registros_a_ignorar;

//* 6. BETWEEN
// Se usa cuando necesitamos obtener valores dentro de un rango determinado.
// Algunas consideraciones:
//  - Incluye los extremos.
//  - Funciona con números, textos y fechas.
//  - Se usa como un filtro de un WHERE.

//Ejemplo:
SELECT nombre,edad
FROM alumnos
WHERE edad BETWEEN 6 AND 12;

//* 7. LIKE:
// Sirve especificar un patrón de búsqueda. Utilizamos comodines (wildcards):
//  - %: representa cero, uno o varios caracteres.
//  - _: representa un solo caracter.

// Ejemplo:
SELECT nombre
FROM usuarios
WHERE nombre LIKE '_a%' //Resultados cuyos nombres tengan a 'a' como segundo caracter.

SELECT direccion
FROM usuarios
WHERE direccion LIKE '%Monroe%' //Resultados cuya calle incluya 'Monroe'

SELECT nombre
FROM clientes
WHERE nombre LIKE 'Los%s' //Resultados cuyos nombres empiezan por 'Los' y terminan con 's'

//* 8. ALIAS:
// Se usan para darle un nomrbre temporal y más sencillo a las tablas, columnas y funciones. 
// Los alias se definen furante una conuslta y persisten sólo durante esa consulta (NO MODIFICAN los nombres originales en la base de datos).
// Para definir un alias usamos AS después de la columna a la que queremos asignarle ese alias.

// ALIAS PARA COLUMNA:
SELECT nombre_de_columna_1 AS alias_nombre_columna1
FROM nombre_tabla;

// Ejemplo:
SELECT razon_social_cliente AS nombre
FROM clientes
WHERE nombre LIKE 'a%'

// ALIAS PARA TABLA:
SELECT nombre, apellido, edad
FROM alumnos_comision_inicial AS alumnos;

//Todo 7. Table Reference + Joins
//Todo 7.1 Table Reference
// Es posible (y necesario) hacer consultas a distintas tablas y unir los resultados.

// Ejemplo: un posible escenario sería querer consultar una tabla en donde están los datos de los clientes y otra tabla en donde están los datos de las ventas a esos clientes.
// Seguramente, en la tabla de ventas, existirá un campo con el ID del cliente (cliente_id)
// Si quisiera mostrar TODAS las ventas de un cliente concreto, necesitaré usar datos de ambas tablas y vincularlas con algún campo que compratan (En este caso, el cliente_id)

SELECT clientes.id AS id, clientes.nombre, ventas.fecha //seleccionamos la columna nombre de la tabla clientes y la columna fecha de la tabla ventas
FROM clientes, ventas
WHERE clientes.id = ventas.cliente_id;

//Todo 7.2 Joins
//Además de hacer consultas dentro de una tabla o hacia muchas tablas a través de TABLE REFERENCE, también es posible (y necesario) hacer consultas a distintas tablas, y unir esos resultados en JOINS.
// Los JOINS, a diferencia que table reference, nos permiten:
//  - Proveer ciertas flexibilidades adicionales.
//  - Su sintaxis es mucho mas utilizada.
//  - Presentan una mejor performance.

//* 1. INNER JOIN:
// Hará una cruza entre dos tablas (Una Intersección). 
// Ejemplo: Si cruzáramos las tablas de CLIENTES y VENTAS y hubiese algún cliente SIN VENTAS, el INNER JOIN no traería a ese cliente como resultado.

//* 1.2 Crear un INNER JOIN

SELECT clientes.id AS id, clientes.nombre, ventas.fecha
FROM clientes
INNER JOIN ventas

// Si bien ya dimos el primer paso que es CRUZAR ambas tablas, debemos aclarar DÓNDE está ese cruce -> qué CLAVE PRIMARIA (PK) se cruzará con qué CLAVE FORÁNEA (FK)

// La sintaxis del join no utiliza el WHERE, si no que requiere la palabra ON. Es ahí en donde indicaremos el filtro a tener en cuenta para realizar el cruce -> lo que antes escribiríamos en el WHERE ahora lo escribiremos en el ON.

SELECT clientes.id AS id, clientes.nombre, ventas.fecha
FROM clientes
INNER JOIN ventas
ON clientes.id = ventas.cliente_id

//* 2. LEFT JOIN y RIGHT JOIN
// Estos tipos de JOINS no excluyen resultados de alguna de las dos tablas. 
// Ejemplo: Si hubiese clientes sin ventas podríamos incluirlos en el resultado mediante LEFT o RIGHT JOIN

//* 2.2 Crear un LEFT JOIN
// Para incluir aquellos clientes sin ventas basta cambiar INNER JOIN por LEFT JOIN. El LEFT JOIN incluirá todos los registros de la primera tabla de la consulta (la tabla izquierda) incluso cuando no exista coincidencia con la tabla derecha.

SELECT clientes.id AS id, clientes.nombre, ventas.fecha
FROM clientes
LEFT JOIN ventas
ON clientes.id = ventas.cliente_id

//* 2.3 Crear un RIGH JOIN
// Para incluir aquellas ventas sin clientes basta cambiar LEFT JOIN por RIGHT JOIN. El RIGHT JOIN incluirá todos los registros de la tabla derecha. Si miramos la query, la tabla ventas aparece posterior a la tabla de clientes...a la derecha! 

SELECT clientes.id AS id, clientes.nombre, ventas.fecha
FROM clientes
RIGHT JOIN ventas
ON clientes.id = ventas.cliente_id

//* 3. Cruzando MUCHAS tablas
// En el siguiente ejemplo se ve cómo hacer cruces de muchas tablas en una misma consulta usando joins:

SELECT clientes.id AS id, clientes.nombre, ventas.fecha
FROM clientes
INNER JOIN ventas
ON clientes.id = ventas.cliente_id
INNER JOIN productos
ON productos.id = ventas.producto_id












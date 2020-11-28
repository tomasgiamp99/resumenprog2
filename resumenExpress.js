//TODO TÍTULO
//Todo Subtítulo
//* Contenido
//& Notas
//$ Resaltado
//! Importante

//TODO REPASO ARQUITECTURA CLIENTE SERVIDOR + MÓDULOS
//TODO 1. ARQUITECTURA CLIENTE - SERVIDOR
//Por un lado hay un cliente y por otro lado el servidor.
//CLIENTE -> hace pedidos (Request) (Programacion 1)
//SERVIDOR -> le responde con información (Response) (Programacion 2)

//Ahora el cliente será nuestro navegador y el servidor Node.js

//& 2.1 Node.js
//Para armar el servidor vamos a usar JS (hay otros)

//* NPM (Node package manager)
//Es el gestor de paquetes de node. Permite descargar e instalar librerias para incorporar a nuestro proyecto.

//TODO 2. MODULOS
//Un modulo es un bloque de codigo reusable -> no altera el comportamiento de otros bloques de codigo.
//Son GRANDES objetos literales con muchas propiedades y muchas funciones.
//Son manejados por NPM.
//Los modulos se EXPORTAN (Modulos Propios) o se REQUIEREN

//& 3.1 Tipos:
//* 1. Modulo nativo: 
//Usamos require() y le pasasmos como argumento el nombre del modulo que quermos requerir.
const fs = require('fs');

//* 2. Modulos de terceros:
//Primero hay que instalarlo usando 'npm install PACKAGE --save' en la consola (el --save no hace falta)
//Lo guardamos en una variable con su mismo nombre

//* 3. Modulo Creado:
//Para requerir un modulo creado por nosotros creamos un archivo .js y dentro de este escribimos el script que necesitemos.
//Una vez definido en nuestro codigo tenemos que dejarlo accesible para poder importarlo dentro de nuestra aplicación.
//Uso el objeto nativo 'module' y su propiedad 'exports'

//Ej:
    const series = [
        {titulo: 'Mad Men', Temporadas: 7},
        {titulo: 'Breakin Bad', Temporadas: 5},
        {titulo: 'Suits', Temporadas: 9}
    ]

    module.exports = series;

//Una vez que exporrtamos nuestro modulo, vamos al archivo en donde lo queremos importar y usamos require().
//Si está en una carpeta, colocamos la ruta en el require

//Ej:
    const series = require('./series/index')

//* 3.2 Cómo requerir un módulo:
//1. Creamos una variable
//2. Le indicamos a node que requerimos un modulo (require)

let modulo = require('nombreModulo');
modulo.propiedad;
modulo.funcionalidad();

//Lo que hay adentro de los modulos es un objeto literal -> tiene propiedades y funciones.
//Por convencion el nombre de la variable es el mismo del modulo.

//&Nota: Para inciar un proyecto en npm uso npm init y completo lo que me piden.
______________________________________________________________________________

/* ÍNDICE
I. Express
    1.1 Introducción a Express (Instalación)
    1.2 Qué trae express.generator
    1.3 Funciones de Alto Nivel
II. Nodemon
    2.1 Instalación de Nodemon
III. Rutas
    3.1 Sistema de Ruteo
    3.2 Definir una ruta
    3.3 Rutas Parametrizadas
IV. MCV (Modelo Vista Controlador)
    4.1 Vistas
    4.2 Modelos
    4.3 Controladores
V. Renderizar Vistas
    5.1 Recursos estáticos
VI. EJS
    6.1 Tags de EJS
    6.2 Parámetros compartidos
    6.3 Mostrar información
    6.4 Plantillas personalizadas

NOTA: Instalar extensión 'Better comments' y copiar el archivo readme en el .json para añadir los demás colores
*/
______________________________________________________________________________

//TODO I. EXPRESS
//Todo 1.1 Introducción a Express (Instalación)
// Es un FRAMEWORK que facilita y agiliza el desarrollo de aplicaciones web en Node JS.
// FRAMEWORK: entorno de trabajo que trae resueltas una serie de tareas automatizando así el desarrollo.
//$ Express es un Framework de Node.
// Express cuenta con un GENERADOR DE PROYECTOS llamado express-generator.

//* INSTALACIÓN DE EXPRESS-GENERATOR (EN CONSOLA)

//*1. Lo instalamos globalmente para usarlo cuando queramos
    npm install express-generator -g

//*2. Creamos unn proyecto Node usando Express con un comando que creará la carpeta del proyecto con el nombre que queramos (generalmente se usa miProyecto)
    express NombreDeLaCarpeta

//Tambipen podemos iniciar el proyecto al mismo tiempo que definimos que el motor de vista sea EJS:
    express --view=ejs NombreDeLaCarpeta

// En algunos casos usamos el comando npx
    npx express --view=ejs NombreDeLaCarpeta

//*3. Luego de instalar el proyecto, dentro de las carpeta creado corremos un comando para instalar las dependencias
//& Nota: para moverse entre carpetas en la consola usamos el comando cd (change directory) para movernos a una carpeta inferior o ../ para movernos a una superior
    npm install

//todo 1.2 Qué trae express-generator
// Trae consigo un "esqueleto" de carpetas, archivos y dependencias que nos pueden servir para iniciar cualquier aplicación.

//* 1. Carpeta Raíz
//  app.js -> acá añadiremos las rutas (Ver x. RUTAS)
//  package.json

//* 2. Carpeta Bin
//Sirve como locación donde se definen CONFIGURACIONES para poder iniciar la aplicación.
//  www -> sin extensión. Trae consigo una lógica interna y se ocupa de que la aplicación corra. Permite iniciar la aplicación de express con un servidor web.

//* 3. Public
//Acá guardamos todos los recusrsos estáticos de nuestra aplicación (son los datos a los que accede el navegador). Acá se guarda el CSS, JS e Imágenes.

//* 4. Carpeta Routes
//Acá inscorporaremos las rutas de la aplicación (Ver x RUTAS) (Es donde administraremos el route system de la aplicación)
//  index.js
//  users.js

//*5. Carpeta Views
//Acá incorporaremos las vistas de la aplicación (Ver x. VISTAS). Encontramos dos vistas iniciales que trae el generador:
//  index.ejs
//  error.ejs

//*6 Controllers
//Esta carpeta no viene instalada pero la añadiremos nosotros. Acá incorporaremos los controladores de las vistas (Ver x. CONTROLADORES)

//todo 1.3 Funciones de alto nivel
//Express cuenta con una función de alto nivel que al invocarla retorna un OBJETO con múltiples propiedades y métodos -> express ().
//Al almacenar esta función en una constante tendremos acceso a todas las funcionalidades que nos da el objeto
    let app = express(); 

______________________________________________________________________________

//TODO II. NODEMON
//Nodemon es un PAQUETE de npm que nos da una herramienta muy útil a la hora de programar en Node.
//$ Nodemos nos permite hacer correr la aplicación continuamente y reiniciarse cada vez que detecta cambios.
//Es decir, ya no necesitamos correr el comando node xxx para que se actualizen los cambios. 

//todo 2.1 Instalación de NODEMON
//Lo mas recomendable es instalar el paquete de manera global para usarlo en cualquier proyecto
//* 1. Instalación global 
    npm install -g nodemon

//*2. Hacemos correr el servidor local
    nodemon
//El puerto predeterminado será http://localhost:3000
______________________________________________________________________________

//TODO III. RUTAS
//A través del sistema de ruteo en Express podemos definir cómo va a responder nuestra aplicación según el método HTTP y la ruta que le esté llegando desde el servidor.
//En la carpeta ROUTES o RUTAS guardaremos un archivo .js por cada recurso, para que administre los request a las rutas que tengan que ver con este recurso.
//$ Cada archivo .js será un módulo que exportaremos.

//todo 3.1 Sistema de Ruteo
//Pasos para definir el sistema de ruteo en cada recurso:

//* 1.Situarse en el archivo .js

//* 2. Requerir el módulo express y guardar la ejecución del método en una variable:
    let express = require('express');

//* 3. Guardar la ejecución del método .Router en una variable
    let router = express.Router();

//* 4. Exportamos todo el contenido de router para hacerlo visible (En la última línea del código)
    module.exports = router;

//* 5. Para implementarlo dentro de app.js creamos una constante y requerimos el módulo (en app.js)
    let nombreRouter = require ('ubicación de la ruta')

//* 6. Usamos el método use() que recibe DOS parámetros
// Parámetro 1: una string que será el nombre del recurso (Al ser una ruta debe empezar con /)
// Parámetro 2: nombre de la constante en la que almacenamos el módulo del recurso.
    app.use('/string x', 'variable y')
// Ahora ya definimos que cada solucitud del recurso 'x' sea atendida por el módulo 'y'

//todo 3.2 Definir una ruta
// Express cuenta con una estructura básica para definir cada una de las rutas. 
// La variable 'router' recibe 2 parámetros: una RUTA y una FUNCIÓN:
    router.get('/', function (req, res){
        código a ejecutar
    })

//RUTA: denominada PATH, es un string que hará referencia a la ruta en sí (url que llegará por petición)
//FUNCIÓN: Recibe dos parámetros: 'req' (request) y 'res' (response). SIEMPRE van en ese orden
// Dentro del código a ejecutar por la función introduciremos 

//todo 3.3 Rutas PARAMETRIZADAS
// Haciendo uso de la propiedad '.params' del objeto literal 'request' podemos CAPTURAR esos valores parametrizados y así empezar a definir qué hacer con cada uno de ellos.
// Esta propiedad, a su vez, fuarda un OBJETO LITERAL que guarda los parámetros que llegan por url con una estructura de 'propiedad:valor' ('propiedad' tendrá el nombre del parámetro donde queremos definir el PATH)
//& Nota: en la ruta puedo plantear un parámetro optativo con '?' u obligatorio con ':'

//Ejemplo:
    router.get('/productos/:id', function(req, res){
        let idProducto = req.params.id
    })
    
____________________________________________________________________________

//TODO IV. MVC (MODELO VISTA CONTROLADOR)
// Es un patrón de diseño -> propone un esquema de trabajo (serie de reglas)
// Su objetivo es crear aplicaciones MODULARES, dividiendo la columna vebral del proyecto en TRES COMPONENTES principales:

//* 1. Modelos
//* 2. Vistas
//* 3. Controlador

//todo 4.1 Vistas
//$ Conforman la interfaz gráfica de la aplicación.
// Contienen todos los elementos que son visibles al usuario. A través de ellas el usuario interactúa ENVIANDO y SOLICITANDO información al servidor.
// Su responsabilidad es DEFINIR la apariencia de los datos y MOSTRARLOS en pantalla 
// No se comunican de forma directa con los modelos.

//todo 4.2 Modelos
//$ Conforman la lógica de la aplicación.
// Sus responsabilidades son CONECTARSE con la base de datos, realizar CONSULTAS y ADMINISTRAR lo que se conoce como la lógica del negocio. 
// No se comunican de forma directa con las vistas.

//todo 4.3 Controladores
//$ Conforman la capa intermedia entre las vistas y los modelos.
// Su responsabilidad es PROCESAR los datos que reciben los modelos y ELEGIR la vista correspondiente en función de los datos requeridos.
// Tienen RELACIÓN DIRECTA con las vistas y con los modelos (es un componente fundamental dentro del flujo del patrón MVC)

// Dentro de la carpeta raíz del proyecto tendremos una carpeta que denominaremos 'controllers'. Adentro alamcenaremos un controlador POR CADA recurso de la aplicación.
//& Cada controlador será un módulo que exportaremos para luego requerirlo donde lo necesitemos.

//todo Crear un Controlador
//* 1. Definimos una variable y le asignamos un objeto literal
    let controlador = {};

//* 2. Dentro del objeto iremos definiendo los métodos que se encargarán de manerjar cada uno de los request
    let controlador = {
        metodo1: ,
        metodo2: ,
        metodo3: ,
    };

//* 3. Podemos quitar el callback que habíamos definido en la ruta y lo escribimos como un método en el controlador
    let controlador = {
        metodo: (req, res) => {
            res.send('mensaje');
        },
    };

//todo Implementar un Controlador
//* 1. Exportamos la variable en la última línea del código (en el controlador.js)
    module.exports = controlador;

//* 2. Requerimos el módulo dentro del archivo de ruta del recurso (en la ruta.js)
    let nombreController = require('../ubicación')

//* 3. Llamaremos al método que necesitemos (callback)
    router.get('/', nombreController.metodo)

____________________________________________________________________________

//TODO V: RENDERIZAR VISTAS 
// Para poder renderizar una vista es importante aclarar al CONTROLADOR qué vista queremos enviar al navegador.

//* .render ()
// Es un método que se encuentra dentro del objeto 'response' de la petición. Nos permite enviarle una vista al navegador para que ese la renderice.
// Recibe una string como parámetro -> el nombre del archivo de la vista queremos renderizar.

//& Nota: cuando le pasamos el nombre del archivo NO HACE FALTA ACLARAR EL NOMBRE DE LA CARPETA donde está almacenada esa vista (siempre y cuuando hayamos configurado el template engine correctamente con el método 'use()')
//& tampoco hace falta aclarar la extensión del archivo.

//Ejemplo:
let controller = {
    mostrarPeliculas:(req,res) => {
        res.render('peliculas');
    };
};

//todo 5.1 Recursos estáticos
// Son aquellos recursos públicos que manejamos dentro de nuestra aplicación (imágenes, css, js, etc) -> es decir, aquellos recursos a los que puede acceder el navegador.
// Para poder disponer libremente de ellos en nuestro proyecto -> le aclaramos a Express dónde vamos a estar almacencnado esos recursos.

app.use(express.static(__dirname + '/public')); //le estamos dando acceso a Express a todo lo que se encuentre en la carpeta 'public' (por convención se usa la carpeta 'public)

//todo Requerir un RECURSO ESTÁTICO
// Para acceder a alguno de estos recursos desde nuestros archivos solo hace falta aclarar la RUTA hacia nuestro recurso
//& Nota: siempre comenzamos la ruta con '/'

// Pasos: 
//* 1. Instalamos ejs (en consola):
    npm i ejs --save

//* 2. Configurar ejs como el templete engine de la app:
    app.set('view engine', 'ejs');

//* 3. Configurar el acceso a la carpeta de recursos estáticos: 
    app.use(express.static(__dirname + '/public'));

____________________________________________________________________________

//TODO VI: EJS

//todo 6.1 Tags de EJS
// Para poder implementar las etiquetas que nos brinda el template engine es necesario que nuestros archivos tengan la extensión .ejs

//* 1. <%  %>
// Esta etiqueta nos permite incorporar código de JS.
//$ Por cada línea de JS que escribamos, debemos encerrar ese código entre la etiqueta <% y la etiqueta %>

//Ejemplo: 
    <% if(4 < 5) { %>
        <h2> El 4 es menor que el 5 </h2> 
    <% } %>

//* 2. <%=  %>
// Esta etiqueta nos permite IMPRIMIR un VALOR DINÁMICO y de esta manera incorporarlo en la estructura HTML general.
//$ Al valor dinámico que busquemos renderizar lo tendremos que encerrar entre la etiqueta <%= y la etiqueta %>

//Ejemplo:
    <% if(nombre) { %>
        <h2> ¡Hola <%= nombre %> !</h2>
    <% } %>

//& Nota: también se usa para renderizar el resultado de un bucle:
//Ejemplo: 
    <% for (var i=0; i<5; i++){ %>
        <p> En esta vuelta la i vale <%= i %> </p>
    <% } %>

//todo 6.2 Parámetros compartidos
// Cómo mostrar una vista:

//* 1. Sobre el objeto response ('res') ejecutamos el método '.render()'
//* 2. Pasamos como argumento el nombre de la vista que queremos renderizar
        let controller {
            mostrarPeliculas: (req,res) => {
                res.render('peliculas')
            }
        }

// El objeto '.render()' puede recibir un objeto literal como SEGUNDO PARÁMETRO. Este objeto tendrá almacenada la información que queremos enviar en conjunto con la vista que estamos renderizando.
// Al objeto tendremos que asignarle PROPIEDAD: VALOR

// PROPIEDAD: será el nombre de la propiedad que usaremos para disponer de esa información dentro del archivo de la vista
// VALOR: será la información que queremos que viaje hasta la vista.

//Ejemplo:
let peliculas = ['Deadpool', 'The Joker', 'Batman']

let controller = {
    mostrarPeliculas: (req, res) => {
        res.redner('peliculas', {listaPeliculas: peliculas})
    }
}

//& Nota: podemos asignarle al objeto la cantidad de propiedades que deseemos. La vista no recibirá un objeto literal con todas las propiedades sino que recibirá las propiedades sueltas como VARIABLES
//Ejemplo:
let peliculas = ['Deadpool', 'The Joker', 'Batman']

let controller = {
    mostrarPeliculas: (req, res) => {
        res.redner('peliculas', {listaPeliculas: peliculas,
        extranjeras: true,
        genero: 'superheroes'})
    }
}
// Cada una de esas propiedades será una variable que tendermos disponible en la vista y así disponer de la infromación que almacena cada una.

//todo 6.3 Mostrar la inforamción
// Para mostrar la información en la vista, haremos uso de los TAGS que nos provee EJS y llamaremos a la propiedad que creamos en el objeto apra almacenar la información.

//Ejemplo:
<% for (let pelicula of listaPeliculas) { %>
    <h2> El Título de la Película es <%= pelicula %> </h2>
<% } %>

//todo 6.4 Plantillas personalizadas
// Nos sirve para repetir porciones de nuestro código en otros archivos del projecto (Ej: header, footer, nav, etc)
// Convertiremos cada una de estas partes en un archivo nuevo que contendrá únicamente esa porción de código.

//& Nota: al trabajar con un template engine almacenamos estos archivos dentro de la carpeta views (o la que hayamos configurado por defecto) para no cortar con el flujo de trabajo.
//& Nota: se suele almacenar estos archivos dentro de una carpeta llamada 'partials'

//* Reutilización del código:
//Para disponer del código que modularizamos hacemos uso de la función 'include()' (en HTML). Esta recibe como parámetro un STRING -> la ruta hacia el archivo que queremos incluir.
//Debemos hacer uso de la etiqueta '<%- %>' que imprimirá el contenido exacto que retorne 'include()'

<%- include('./partials/archivo')


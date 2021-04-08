//TODO 1. PROMESAS
// Son funciones que permiten ejecutar código asincrónico de forma eficiente.

//* 1) .then()
//Devolverá un resultado (o no). Mientras tanto, el código se sigue ejecutando.

//Ejemplo:
obtenerUsuarios()
    .then(function(data){
        console.log(data); // Ejecuta este console.log SOLO si obtenerUsarios() devuelve un resultado
    }); // Función asincrónica

console.log("Se sigue ejecutando") // Código que se ejecuta mientras la promesa se ejecuta

// Promesas Anidadas:

obtenerUsuarios()
    .then(function(data){
        return filtrarDatos(data);
    })
    .then(function(dataFiltrada){
        console.log(dataFiltrada)
    })

//& NOTA: Los .then() necesitan retornar la data procesada para que pueda ser usada por otro .then()

//* 2) .catch()
// En caso de NO obtener un resultado, se genera un error -> .catch() captura cualquier error que pueda generarse a través de las promesas

//Todo 1.2 Promesas en Conjunto - Promise.all()
// Usamos Promise.all() para que dos o más promesas se resuelvan para realizar cierta acción. 
// Este contiene un array de promesas que una vez que se hayan resuelto, un .then() se ejecutará con los resultados de las mismas.

//* 1) Guardamos las promesas que necesitamos obtener
let promesasPeliculas = obtenerPeliculas();
let promesaGeneros = obtenerGeneros();

//* 2) Utilizamos el método Promise.all() que contiene un array con las promesas que guardamos anteriormente
Promise.all([promesasPeliculas, promesasGeneros])

//* 3) El callback del .then() recibe un array con los resultados de las promesas cumplidas
.then(function([resultadoPeliculas, resultadoGeneros]){
    console.log(resultadoPeliculas, resultadoGeneros)
});

//TODO II. SEQUELIZE

//Todo 2.1 Instalación

//* 1) Dentro de la carpeta del proyecto de Node (en consola):

npm install sequelize-cli -g;
npm install sequelize;
npm install mysql2;

//* 2) Creamos un archivo llamado .sequelizerc en la razíz del proyecto.

//* 3) Dentro del archivo .sequelizerc que creamos escribimos: 

const path = require('path')
module.exports = {
  config: path.resolve('./database/config', 'config.js'),
  'models-path': path.resolve('./database/models'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}

//* 4) Para que Sequelize cree todas las carpetas y archivos que necesitamos (en consola):

sequelize init

//* 5) En el archivo config.js dentro de la carpeta que creó Sequelize en la ruta /database/config/config.js reemplazamos nuestras credenciales.

//* 6) En el archivo config.js asignamos todo el JSON que modificamos a module.exports

module.exports = {
    "JSON"
},

//Todo 2.2 Raw Queries
// Las consultas sin formato o Raw Queries son una forma de manipular la base de datos con Sequelize mediante consultas SQL.
//& NOTA: debemos asegurarnos de que nuestra base de datos tenga conexión.

//* 1) Requerimos el objeto DB que exporta /database/models/index.js:

let db = require("../database/models");

//* 2) .query() recibe una consulta SQL como parámetro y se debe acceder al objeto sequelize para poder llegar a ella:

db.sequelize.query("SELECT * FROM ...")

// El retorno de sequelize.query() será un array de dos posiciones donde nuestros resultados estarán en la primer posición -> podemos definir qué hacer con esta información dentro del callback que recibe .then().

// Ejemplo:

db.sequelize.query('SELECT * FROM usuarios')
    .then(resultados => {
        let usuarios = resultados[0];
        console.log(usuarios)
    });

//Todo 2.3 Modelos
// En los patrones de diseño MVC (Modelo Vista Controlador), los modelos contienen únicamente los datos puros de aplicación -> no contiene lógica que describa cómo pueden representarse los datos a un usario -> este puede accedera a la capa de almacenamiento de datos. Lo ideal es que el modelo sea independiente del sistema de almacenamiento.

// Un modelo es la representación de nuestra tabla en código -> con esto obtenemos recursos que nos permiten realizar consultas e intereacciones con la base de datos de manera simplificando usando (en este caso) sequelize.

//* CREAR UN MODELO
//& NOTA: Los modelos son archivos .js y deben ser creados con esa extensión. Además, los nombres de los modelos deben estar escritos en UpperCamelCase y en singular. 

// Un modelo es una función que definimos y luego exportamos con module.export.

// Recibe 2 parámetros: 
//  1) sequelize: recibe el objeto sequelize para poder acceder al método define().
//  2) DataTypes: objeto que nos dará la posibilidad de decirle a nuestras columnas qué tipo de datos permitirán.

const Module = sequelize.define();
return Module;

//* Método define()
// Nos permite definir asignaciones entre un método y una tabla.
// Lo que devuelva define() será almacenado en una variable con el nombre del modelo para luego ser retornada por la función que creamos

const pelicula = sequelize.define(alias, cols, config);
return pelicula;


// Recibe 3 parámetros:
//  1) Alias: identidica al modelo. No es algo determinante. Solemos asignarle el mismo nombre del modelo como String
//  2) Cols: Objeto con la configuración de las columnas en la base de datos. Definimos qué tipos de datos deben recibir las columnas de la base de datos.

//Ejemplo:
a cols = {
    id: {
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
}

//  3) Objeto con configuraciones adicionales (opcional): por ejemplo, si el nombre de nuestra tabla está en inglés y el de nuestro modelo en español, deberíamos aclararle al modelo que esto es así mediante un objeto literal como este: 

module.exports = (sequelize, DataTypes) => {
    const pelicula = sequelize.define("Pelicula", {
        // Configuración de las columnas.
    },
    {
        tableName: 'movies',
        // Si el nombre de la tabla no coincide con el del modelo
        timestamps: false,
        // Si no tengo timestamps
    });

    return pelicula;
}


//* Model Timestamps
// Los timestamps no son obligatorios pero la mayoría de las tablas suelen tenerlos y forman parte del standard. Deben llamarse de la misma forma que se ve en el ejemplo.

// Ejemplo:
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define("Usuario", {
        email: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        editedAt: {
            type: DataTypes.DATE
        }
    });

    return Usuario;
}

//Todo 2.4 Sequelize SELECT
// Sequelize utiliza una función llamada FIND para buscar información en una base de datos. Junto con FIND tenemos algunas variaciones como:
//  - findAll()
//  - findOne()
//  - findByPk()

// Siempre escribirmos esto en archivos controladores USANDO MODELOS YA CREADOS.

//* 1) findAll()
// Para buscar todos losd atos registrados en la tabla debemos usar findAll()

const db = require('../database/models'); // conexión a la base de datos.

db Usuario.findAll() 
    .then((resultados) => {
        console.log(resultados);
    }); //la función findAll() devuelve una promesa. La usamos para usar el resultado de la búsqueda. El resultado se asignará en el parámetro de esta función (aquí lo llamaremos resultados pero puede tener otro nombre)

//* 2) findOne()
// Permite que busquemos resultados que coincidan con los atributos indicados en el objeto literal que recibe el método.

db Usuario.findOne()
    .then((resultado) => {
        console.log(resultado);
    });

//* 3) findByPk()
// Busca un registro con la clave primearia del mismo valor al parámetro pasado.

db Usuario.findByPk(8)
    .then((resultado) => {
        console.log(resultado)
    }); // SELECT * FROM autos WHERE id = 8

//Todo 2.5 Sequelize WHERE
// Usamos el objeto literal con el atributo WHERE y un método de busca para filtrar datos -> agregamos una condición a la consulta.

const db = require('../database/models');
db.Auto.findAll({
    where:[
        { marca: 'Fiat' } // Dentro del WHERE pasamos el atributo acuerdo con la columna de la tabla y el valor a buscar.
    ]
}) .then(resultados => {
    console.log(resultados)
})

//* Operadores
// Cuando queremos filtrar por criterios que no sean igualdad necesitamos utilizar e importar los operadores de Sequelize.

const db = require('../models');
const op = db.Sequelize.Op;

db.Auto.FindAll({ //usamos los operadores en cada filtro del WHERE
    where: [
        { año: { [op.gte] : 2010}} // gte: Greather Than Equals o >=
    ]
}) .then(resultados => {
    console.log(resultados)
})

o

const db = require('../models');
const op = db.Sequelize.Op;

db.Auto.FindAll({ //usamos los operadores en cada filtro del WHERE
    where: [
        { marca: { [op.like]: "%f%"}}} // gte: Greather Than Equals o >=
    ]
}) .then(resultados => {
    console.log(resultados)
})

//Todo 2.6 Sequelize ORDER, OFFSET y LIMIT

//* 1) ORDER:
// Order es una forma de ordenar el resultado de la consulta a la base de datos a través de una columna elegida.
// Puedo ordenar elementos por id, fecha de creación, nombre, etc.

db.Usuario.findAll({
    order:[
        ['nombre', 'ASC'] // El primer valor del array es la columna que desea ordenar, el segundo valor es el orden del ordenamiento: ascendente o descendente.
    ],
});

//* 2) LIMIT:
// Sirve para limitar el número de resultados a obtener.
// Para limitar el número de resultados, simplemente hay que agregar el atributo limit al objeto y pasarlo al findAll():

db.Usuario.findAll({
    limit: 10
}) .then((resultados) => {
    console.log(resultados)
})

//* 3) OFFSET:
// Sirve para imitir varios resultados, ampliamente utilizados para paginar los resultados.

db.Usuario.findAll({
    offset: 10
}).then((resultados) => {
    console.log(resultados)
})


//& NOTA: Se pueden usar todos los métodos juntos pasándolos como parámetros al findAll():

db.Usuario.findAll({
    order: [
        ['nome', 'ASC'],
    ],
    offset: 5,
    limit: 10
})

//TODO 3. MÉTODO HTTP
// El protocolo HTTP define una serie de reglas que es necesario seguir para que la inforamción pueda ser procesada.

//Todo 3.1 Método de transacción
//El flujo de transacción que propone el protocolo HTTP viene acompañado de varios métodos que definen lo que pasará con cada pedido que le solicite un cliente a un servidor.
// EN express podemos implementar los métodos sobre la ejecución de express -app- o sobre el sistema de rutas del sistema -router. 

//* 1) Método GET:
// Con este método podemos SOLICITARLE datos al servidor. (Al acceder a una página a través de una url estoy haciendo una petición con get)

//* 2) Método POST:
// Con este método podemos ENVIARLE datos al servidor. (Al registrarme en un sitio nuevo con mis datos estoy haciendo uan petición con post)

//* 3) Método PUT:
// Con este método podemos REEMPLAZAR información existente. (Al cambiar información personal en Instagram estoy haciendo una petición con put)

//* 4) Método DELETE:
// Con este método podemos BORRAR un registro existente en el servidor. (Al borrar una foto de Instagram estoy haciendo una petición con delete)

//Todo 3.2 Procesamiento GET
// Las peticiones que se hacen por GET son todas aquellas que vienen directamente desde la URL del navegador o INTERNAMENTE en la página desde un enlace.

// Comunmente usamos GET para:
//  - Retornar VISTAS
//  - Retornar ARCHIVOS
//  - Retornar DATOS

// Cuando definimos una ruta podemos hacerlo directamente sobre la ejecución de express, implementar un sistema de ruteo o también incorporar controladores que se encarguen de manejar las rutas -> es en al callback de la ruta que estamos definiendo en donde escribiremos la lógica para manejar la petición que esté llegando.

// enrutador
router.get("/peliculas", (req, res) => { res.render('peliculas')} ); //callback
// enrutador con controlador
router.get("/peliculas", peliculasController.todas ); // callback
… const controller = {
    todas: (req, res) => { res.render('peliculas')}
 };
// sobre la ejecución de express
app.get("/peliculas", (req, res) => { res.render('peliculas')} ); // calback

//* Query String
// Es una cadena de texto -conocida como cadena de consulta- que viaja en la URL al momento de hacer una petición al servidor.
// El query string comienza al final de la ruta con el signo ?- Está formado por el par clave:valor. En el vaso de haber más de un par, se separa con &

// Ejemplo: 
//  https://www.youtube.com/results?search_query=digital+house
//$  ?search_query=digital+house

// Para acceder al query string dentro del callback que maneja la petición lo haremos a través de la propiedad query del objeto request. Esta propiedad es un objeto literal, en donde sus claves y valores serán las mismas que viajan en la URL:

// Ejemplo:
console.log(req.query.search_query) // digital house

//Todo 3.3 Procesamiento POST
// Comunmente usamos POST para:
//  - Enviar información sensible al servidor.
//  - Crear un nuevo recurso.

// En un contexto donde quisiéramos agragar una nueva película a nuestro sistema, tendríamos que crear DOS rutas: 1 que muestre el formulario de creación + 1 que se encargue de procesar la información:

// ruta que envía un formulario a la vista → GET
router.get('/pelicula/crear', (req,res) => {res.render('crear')});
// ruta que procesa la información del formulario → POST
router.post('/pelicula/crear', (req,res) => {...});

//& NOTA: los nombres de las rutas pueden ser iguales porque cada una está implementando un método diferente.

//* Configurar el formulario:
// Las peticiones que se hacen por POST son tadas aquellas que viajan a través de un FORMULARIO. Es necesario que el mismo tenga seteados los atributos:
//  - method: donde escribiremos el método HTTP que usaremos para enviar información.
//  - action: donde escribiremos la ruta a donde viajará esa información para ser procesada

// Ejemplo: 
<form method="POST" action="/pelicula/crear">
...
</form> 

//* Capturar la información:
// Para poder trabajar con los datos que se envían desde el formulario, es necesario configurar el entorno de nuestra aplicación para que sea capaz de capturar esa información.
// Si estamos trabajando con express-generator, esta configuración se creará por defecto -> de lo contrario, añadir en app.js:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// De esta forma le estamos aclarando a la aplicación que todo aquello que llegue desde un formulario, queremos capturarlo en forma de objeto literal. Y a su vez, tener la posibilidad de convertir esa información en un formato json, en caso de necesitarlo.

//* req.body
// En el request de la petición encontraremos la propiedad body, un OBJETO LITERAL que contendrá TODA la información del formulario:
//  - El nombre de cada clave de ese objeto será el nombre del atributo NAME de cada input del formulario.
//  - El valor será el dato que se haya ingresado en ese campo.

// Ejemplo:
<form method="POST" action="/pelicula/crear">
Título: <input type="text" name="titulo" value=""> </input>
</form> 

router.post('/pelicula/crear', (req,res) => {
console.log(req.body) // { titulo: Batman }
});

//Para cerrar el ciclo del request y response que hace el servidor es necesario hacer un redireccionamiento -después de implementada la lógica- usando el método redirect() sobre el response: 
res.redirect('/peliculas');

//Todo 3.4 Método Create
// Create es un método que nos permite agregar nuevos registros en nuestras tablas de la base de datos.
// .create() es un método que le pertenece a los modelos de nuestra base de datos -> primero necesitamos llamar al modelo.

const db = require('../database/models');
db.Usuario.create();

// .create() recibe un objeto literal donde definimos qué campos vamos a modificar y con qué valores. 

const db = require('../database/models');
db.Usuario.create({
    name: "Manuel",
    username: "manolito",
    password: "manolo123"
}); // El objeto literal que recibe .create() debe contener como KEY el mismo nombre del campo a escribir en la DB y como valor el contenido que queramos almacenar en él.

//* HASHING
// Cuando trabajamos con datos sensibles, es fundamental almacernarlos encriptados, para preservar la información en caso de que un tercero acceda a ella.
// Las funciones de hasheo nos permiten encriptar datos -> transformar un texto pleno en una nueva serie de caracteres -con longitud fija- imposible de descifrar para el ojo humano.
// Estas funciones vienen acompañadas de dos características principales:
//  - La opción de encriptar un dato.
//  - La opción de comparar un dato entrante con un dato haseado para verificar si coinciden o no.

// El paquete bycryptjs nos permite incorporar estas funciones en nuestro proyecto de Node -> para usarlo lo instalamos a través de npm en la consola:
npm install bcryptjs --save

//? .hashSync()
// Es un método que trae el paquete bcrypt que nos va a permitir encriptar datos. Recibe dos parámetros:
//  1) El dato que queremos encriptar.
//  2) La sal (+) que le queremos añadir a la encriptación.

// (+) la sal es un pequeño dato añadido que hace que los hash sean significativamente más difíciñes de crackear. En este contexto se suele pasar 10 o 12.

const bcrypt = require('bcryptj');
let passEncriptada = bcrypt.hashSync('monito123',10)

//? .compareSync()
// Es un método que trae el paquete bcrypt que nos va a permitir comparar un texto pleno contra un hash para saber si coinciden o no. Este método retorna un booleano y recibe dos parámetros:
//  1) El texto plano.
//  2) El hash con el que queremos comparar.

let check = bcrypt.compareSync('monito123', passEncriptada);
console.log(check); // true

//& NOTA: hash() y compare() se ejecutan de manera SINCRÓNICA, es decir, que BLOQUEA la ejecución del resto del código hasta que termine con la operación.

// Ejemplo: Guardando dato de forma segura
const db = require("../database/models");
const bcrypt = require('bcryptjs');
let passEncriptada = bcrypt.hashSync('monito123', 10);

db.Usuario.create({
    name: "Manuel",
    username: "manolito",
    password: passEncriptada
});

//Todo 3.5 Método Update
// Update es un método que nos permite editar registros en nuestras tablas de la base de datos.
// .update() es un método que le pertenece a los modelos de nuestra base de datos -> primero necesitamos llamar al modelo.

const db = require("../database/models");
db.Usuario.update();

// .update() recibe 2 parámetros (ambos objetos literales):
//  1) Debemos indicarles qué campo de la tabla modificar y qué valor asignarle.
//  2) Debe tener como mínimo un WHERE que indique de manera única a qué refistro aplicar los cambios. En caso de no hacerlo se modificarán todos los campos de la DB. //! IMPORTANTE NO OLVIDAR EL WHERE

const db = require("../database/models");
db.Usuario.update({
    username: 'ManuelF'
},
{
    where: {
        id:10
    }
});

//Todo 3.6 Método Destroy
// Destroy es un método que nos permite eliminar registros en nuestras tablas de la base de datos.
// .destroy() es un método que le pertenece a los modelos de nuestra base de datos -> primero necesitamos llamar al modelo.

const db = require("../database/models");
db.Usuario.destroy();

// .destroy() recibe UN solo parámetro:
//  - Objeto literal con un WHERE que tendrá la condición que necesitamos aclarar para eliminar el registro que nosotros queramos. En caso de no hacerlo se eliminarán todos los campos de la DB. //! IMPORTANTE NO OLVIDAR EL WHERE

const db = require("../database/models");
db.Usuario.destroy({
    where: {
        id: 10
    }
});

//TODO 4. SESSION
// Es una variable que está accesible en todo el sitio. Nos permite guardar y compartir información de un mismo usuario entre las vistas.
// Los usuarios no pueden identificarse a menos que utilicen algún tipo de mecanismo que lo haga posible -> para eso usamos session -> a cada usario se le asigna una sesión única pudiendo de esta manera almacenar el estado de ese usario.

// La información del usuario la guardaremos del lado del servidor.
// El identificador único que asocia la información con ese usuario la guardaremos del lado del cliente, en el navegador.

//  Del lado del servidor: datos del usuario que sean relevantes para permitirle navegar con fluidez por nuestro sitio (desde información personal que sirva para el loguqo o alguna característica global, como el idioma, moneda o color de fondo).
// Del lado del cliente: se generará un identificador único que asociará ese usuario con toda esa información.

//& NOTA: si el usuario cierra el navegador, toda esa información se borra.

//Todo 4.1 Implementar Session:
//* 1) Instalamos el módulo express-session con npm:
npm install express-session --save

//* 2) Requerimos el módulo en el entry point de la aplicación:
const session = require('express-session');

//* 3) Lo configuramos

//* 4) Ejecutamos session():
// Pasamos como argumento un objeto literal con la propiedad secret con un texto único aleatorio, que servirá para identificar nuestro sitio web.

app.use(session( {secret: "nuestro mensaje secreto"}))

//* 5) Llamamos a la propiedad session del objeto request:
// para definir y almacenar información.

req.session.colorFondo = 'Violeta';

//* 6) Guardamos la información en una variable

let colorFondo = req.session.colorFondo;

//Todo 4.2 Compartir info a todas las vistas:
// A veces, queremos compartir información con TODAS las vistas de nuestro sitio. Por ejemplo, si el usuario logueado para saludarlo en todas las páginas.

//$ Usamos la variable res.locals en el archivo app.js.
// res.locals es un objeto literal donde puedo almacenar todos los valores que quieran compartir con todas las vistas

// Ejemplo: 
app.use(function(req,res,next){
    res.locals = {
        nombreDeUsuario: 'Juan'
    }
    return next()
}) // Luego, en todas las vistas puedo ahcer uso de la variable nombreDeUsuario
<%= nombreDeUsuario %>

// También podemos implementar condicionales:
app.use(function(req, res, next) {
    if (req.session.usuarioLogueado != null) {
        res.locals = {
            usuarioLogueado: req.session.usuarioLogueado
        }
        } 
        else {
            res.locals = {
                usuarioLogueado: null
            }
        }
        return next();
});
// Finalmente en la vista podemos cambiar el header según si el usuario está logueado o no.
<% if (usuarioLogueado != null) { %>
    <%- include('headerLogueado')
<% } else { %>
    <%- include('headerDeslogueado')
<% } %>

// En el headerLogueado probablemente vaya a usar la variable usuarioLogueado para poner los datos del usuario.

//TODO 5. COOKIES
// Son archivos que podemos guardar del lado del cliente -> en el navegador del usuario.
// Podemos configurarle (a diferencia de la sesión) un "tiempo de vida" -> dejará de existir cuando expire ese tiempo y no cuando el usuario cierre el navegador.

// Al almacenar datos del lado del cliente, contamos con un límite de espacio.
// Es importante no guardar ningún dato sensible en una cookie (como una contraseña)

// Para mantener logueado a un usuario luego de cerrar el navegador, podemos usar una cookie para identificarlo y loguearlo automáticamente la próxima vez que ingrese al sitio.

//Todo 5.1 Implementar Cookies:
//* 1) Instalamos el módulo cookie-parser con npm:
npm i cookie-parser --save // Con expresss-generator ya viene incluído este módulo

//* 2) ejecutamos el método .cookie()
// Sirve para crear una cookie y guardar informació  en ella.
// Le pasamos dos argumentos:
//  1) El nombre que le quiero asignar a la cookie.
//  2) El valor.

res.cookie('nombre', 'valor');0

//* 3) usamos el objeto req para leer la información.
// Para leer la información de una cookie usamos el objeto request, llamando al objeto cookies, seguido del nombre de la cookie que definimos anteriormente.

console.log(req.cookies.nombre)
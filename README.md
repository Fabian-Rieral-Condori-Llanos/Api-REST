# API REST
--------

* * *

### BASE DE DATOS

Creacion de base de datos para la ejecucion de este programa en cualquier servicio se adjunto un archivo con un script con comandos de sql para la creacion de apirest base de datos con unos usuarios cargados BasedeDatos.sql una vez creado la base de datos con los comandos que exiten en su gestior de base de datos faborito pasaremos con la conexion a la api

* * *

### CONEXION A LA BASE DE DATOS

Abra el archivo index.js cambien las variables de la parte de conexion por las de su equipo y puerto donde corre su base de datos

```plaintext
// Conexion a base de datos

const datos = new Pool({
user: "postgres", // usuario para base de datos
host: "localhost", // host para conexion
database: "apirest", // conexion
password: "postgres", // contraseña
port: "54322" // puerto en la que estara
})
```

* * *

### Configuracion del puerto

Configure el puerto en el cual se levantara el servicio

```plaintext
const app = express();
const port = 3000; //cambiar
```

* * *

### Rutas para la API

Estas son las rutas de la api Metodos habilitados GET, POST, PUT, DELETE

```plaintext
http://localhost:3000/
/usuarios (LISTA TODOS LOS USUARIOS USAR GET)
http://localhost:3000/
/estado (LISTA DATOS DEL DEV USAR GET)
http://localhost:3000/
/usuario/:id (LISTA USUARIOS POR ID USAR GET CON UN ID)
http://localhost:3000/
/usuarios (CREA UN NUEVO REGISTRO EN LA TABLA DE LA BASE DE DATOS USA EL METODO POST)
http://localhost:3000/
/usuarios/:id (ACTUALIZA UN REGISTRO EN LA TABLA DE UN USUARIO CON EL METODO PUT)
http://localhost:3000/
/usuarios/:id (ELIMINA UN USUARIO DE LA BASE DE DATOS CON EL METODO DELETE)
http://localhost:3000/
/usuarios/promedio-edad (LISTA EL PROMEDIO DE EDAD POR EL METODO GET)
```
const express = require('express');
const bodyParser = require('body-parser');
const {Pool} = require('pg')

const app = express();
const port = 3000;

// Conexion a base de datos

const datos = new Pool({
    user: "postgres", // usuario para base de datos
    host: "localhost", // host para conexion
    database: "apirest", // conexion
    password: "postgres", // contraseña
    port: "54322" // puerto en la que estara
})
class Model {
    async getUsuario(){
        const {rows} = await datos.query("SELECT * FROM usuario;");
        return rows
    }
    async getEstado(){
        const {rows} = await datos.query("SELECT * FROM estado;");
        return rows
    }
    async getUsuarioId(id){
        const {rows} = await datos.query("SELECT * FROM usuario WHERE id = $1", [id]);
        return rows[0]
    }
    async getPromedio(){
        try {
            const result = await datos.query('SELECT ROUND(AVG(EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento)))::numeric, 2) AS promedio_edades FROM usuario');
            const rows = result.rows;
            return rows[0].promedio_edades;
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            throw new Error('Error al obtener el promedio de edades');
        }
    }
    async addUsuario(nombre, primer_apellido, segundo_apellido, fecha_nacimiento){
        await datos.query(
            "INSERT INTO usuario (nombre, primer_apellido, segundo_apellido, fecha_nacimiento) VALUES ($1, $2, $3, $4)",
            [nombre, primer_apellido, segundo_apellido, fecha_nacimiento]
        );
    }
    async updateUsuario(id, nombre, primer_apellido, segundo_apellido, fecha_nacimiento){
        await datos.query(
            "UPDATE usuario SET nombre = $2, primer_apellido = $3, segundo_apellido = $4, fecha_nacimiento = $5 WHERE id = $1",
            [id, nombre, primer_apellido, segundo_apellido, fecha_nacimiento]
        );
    }
    async deleteUsuario(id) {
        await datos.query("DELETE FROM usuario WHERE id = $1", [id]);
    }
}

// Controler
class Controller{
    constructor(model){
        this.model = model
    }
    async getUsuario(req, res){
        const data = await this.model.getUsuario()
        res.send(data)
    }
    async getEstado(req, res){
        const data = await this.model.getEstado()
        res.send(data)
    }
    async getUsuarioId(req, res) {
        const id = req.params.id;
        try {
          const data = await this.model.getUsuarioId(id);
          if (data) {
            res.send(data);
          } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
          }
        } catch (error) {
          console.error('Error al obtener el usuario por ID:', error);
          res.status(500).json({ mensaje: 'Error al obtener el usuario por ID' });
        }
      }
    
      async getPromedio(req, res) {
        try {
          const promedioEdad = await this.model.getPromedio();
          res.json({ promedio_edad: promedioEdad });
        } catch (error) {
          console.error('Error al obtener el promedio de edades:', error);
          res.status(500).json({ mensaje: 'Error al obtener el promedio de edades' });
        }
      }
    async addUsuario(req, res){
        const { nombre, primer_apellido, segundo_apellido, fecha_nacimiento } = req.body;
        try {
            await this.model.addUsuario(nombre, primer_apellido, segundo_apellido, fecha_nacimiento);
            res.status(201).json({ mensaje: 'Usuario insertado exitosamente' });
        } catch (error) {
            console.error('Error al insertar el usuario:', error);
            res.status(500).json({ mensaje: 'Error al insertar el usuario' });
        }
    }
    async updateUsuario(req, res){
        const id = req.params.id;
        const {nombre, primer_apellido, segundo_apellido, fecha_nacimiento } = req.body;
        try {
            await this.model.updateUsuario(id, nombre, primer_apellido, segundo_apellido, fecha_nacimiento)
            res.status(200).json({ mensaje: 'Usuario actualizado exitosamente' });
        } catch (error) {
            console.error('Error al actualizar el usuario:', error);
            res.status(500).json({ mensaje: 'Error al actualizar el usuario' });
        }
    }
    async deleteUsuario(req, res){
        const id =req.params.id;
        await this.model.deleteUsuario(id);
        res.sendStatus(200)
    }
}
const model = new Model();
const controller = new Controller(model);
app.use(express.json());
// Rutas de la API

app.get('/usuarios', controller.getUsuario.bind(controller));
app.get('/estado', controller.getEstado.bind(controller));
app.get('/usuario/:id', controller.getUsuarioId.bind(controller));
app.post('/usuarios', controller.addUsuario.bind(controller));
app.put('/usuarios/:id', controller.updateUsuario.bind(controller));
app.delete('/usuarios/:id', controller.deleteUsuario.bind(controller));
app.get('/usuarios/promedio-edad', controller.getPromedio.bind(controller));


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado ${port}`);
});
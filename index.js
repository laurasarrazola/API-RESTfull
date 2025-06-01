const exp = require('express');
const app = exp();
// Importa el módulo express y crea una instancia de la aplicación
require('dotenv').config();
// Carga las variables de entorno desde un archivo .env

const logger = require('morgan');
app.use(logger('dev')); // Configura morgan para registrar las peticiones HTTP en el formato 'dev'
//traer la dependencia morgan y se guarda en dependencia logger

app.use(exp.urlencoded({ extended:  false })); // Configura express para que pueda recibir datos en formato URL-encoded
app.use(exp.json()); // Configura express para que pueda recibir datos en formato JSON

const modeloUsuario = require('./backend/models/usuario.model');
// Importa el modelo de usuario definido en el archivo usuario.model.js
app.get('/usuarios', async (req, res)=>{
    let listaUsuarios = await modeloUsuario.find();
    console.log(listaUsuarios);
});

app.listen(process.env.PORT, () => {
    console.log('Servidor en linea');
});
// Inicia el servidor en el puerto especificado en las variables de entorno y muestra un mensaje en la consola


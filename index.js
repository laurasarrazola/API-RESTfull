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
    if(listaUsuarios)
        res.status(200).json(listaUsuarios); // Define una ruta GET para obtener todos los usuarios
    else 
        res.status(404).json({mensaje: "No se encontraron usuarios"}); // Si no hay usuarios, devuelve un mensaje de error
});

//CONSULTA USANDO UN PARAMETRO: se puede consultar un usuario por su documento
app.get('/usuarios/:documentoUsuario', async (req, res) => {
    let documentoEncontrado = await modeloUsuario.findOne({documento:req.params.documentoUsuario}); //referencia:req.params.ref hace referencia al parámetro de la URL
   if (documentoEncontrado){
        res.status(200).json(documentoEncontrado); // Si se encuentra el usuario, devuelve sus datos        
   } else {
        res.status(404).json({error: "Usuario no encontrado"}); // Si no se encuentra, devuelve un mensaje de error
   }
});

//INSERCIÓN DE USUARIOS: Se define una ruta POST para insertar un nuevo usuario
app.post('/usuarios', async(req, res)=> {
    const nuevoUsuario = new modeloUsuario({
        documento: req.body.documento,
        nombreCompleto: req.body.nombreCompleto,
         FNacimiento: req.body.FNacimiento
    });

    nuevoUsuario.save()
    .then(usuario=>{
        console.log("Cliente creado: ", usuario);
    })
    .catch(err=>{
        console.log("Error al crear cliente: " ,err);
    });
    res.json("Registro exitoso")
})



app.listen(process.env.PORT, () => {
    console.log('Servidor en linea');
});
// Inicia el servidor en el puerto especificado en las variables de entorno y muestra un mensaje en la consola


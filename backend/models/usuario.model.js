const { type } = require('os');
const mongoose = require('../config/connection');
const SchemaUsuario = new mongoose.Schema({
    documento: {
        type: String,
        required : [true, "El documento es obligatorio"], //lo que va entre comillas es el mensaje que sale en caso de que no se cumpla 
        minLength: [7, "El documento debe tener al menos 7 caracteres"],
        maxLength: [10,"El documento debe tener como máximo 10 caracteres"]
    },
    nombreCompleto:{
        type: String,
        minLength: [3, "El nombre completo debe tener al menos 3 caracteres"],
        maxLength: [150, "El nombre completo debe tener como máximo 150 caracteres"]
    },
    FNacimiento: {
        type: Date,
        max: Date.now
    }
    
});

const usuario = mongoose.model('usuarios', SchemaUsuario); 
// Crea un modelo de Mongoose llamado 'usuarios' utilizando el esquema definido anteriormente
module.exports = usuario;
// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación

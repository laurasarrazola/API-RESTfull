// Este archivo define el modelo de productos utilizando Mongoose, que es una biblioteca de Node.js para trabajar con MongoDB.
const mongoose = require("../config/connection");

// Define el esquema para el modelo de productos
// Este esquema define la estructura de los documentos de productos en la base de datos MongoDB
const schemaProducto = new mongoose.Schema({
  referencia: {
    type: String,
    required: [true, "La referencia es obligatoria"],
  },
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
  },
  precio: {
    type: Number,
    default: [0, "El precio por defecto es 0"],
    min: [0, "El precio no puede ser negativo"],
  },
  stock: {
    type: Number,
    default: [0, "El stock por defecto es 0"],
    min: [0, "El stock no puede ser negativo"],
  },
  imagen: {
    type: String,
    required: [true, "No existe la imagen o ruta a la imagen por defecto"],
  },
  habilitado: {
    type: Boolean,
    default: true,
  },
});

// Crea un modelo de Mongoose llamado 'productos' utilizando el esquema definido anteriormente
const producto = mongoose.model("productos", schemaProducto);

// Exporta el modelo para que pueda ser utilizado en otras partes de la aplicación
module.exports = producto;

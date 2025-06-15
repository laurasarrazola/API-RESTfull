const exp = require("express");
const app = exp();
// Importa el módulo express y crea una instancia de la aplicación
require("dotenv").config();
// Carga las variables de entorno desde un archivo .env

const logger = require("morgan");
app.use(logger("dev")); // Configura morgan para registrar las peticiones HTTP en el formato 'dev'
//traer la dependencia morgan y se guarda en dependencia logger

app.use(exp.urlencoded({ extended: false })); // Configura express para que pueda recibir datos en formato URL-encoded
app.use(exp.json()); // Configura express para que pueda recibir datos en formato JSON

const modeloUsuario = require("./backend/models/usuario.model");
// Importa el modelo de usuario definido en el archivo usuario.model.js
const modeloProducto = require("./backend/models/productos.model");
// Importa el modelo de productos definido en el archivo productos.model.js

// Conexión a la base de datos MongoDB
app.get("/usuarios", async (req, res) => {
  let listaUsuarios = await modeloUsuario.find();
  if (listaUsuarios) res.status(200).json(listaUsuarios);
  // Define una ruta GET para obtener todos los usuarios
  else res.status(404).json({ mensaje: "No se encontraron usuarios" }); // Si no hay usuarios, devuelve un mensaje de error
});

/*****************************************************
 *                                                   *
 *                     CONSULTA                      *
 *                                                   *
 *****************************************************/

//CONSULTA USANDO UN PARAMETRO: se puede consultar un usuario por su documento
app.get("/usuarios/:documentoUsuario", async (req, res) => {
  let documentoEncontrado = await modeloUsuario.findOne({
    documento: req.params.documentoUsuario,
  }); //referencia:req.params.ref hace referencia al parámetro de la URL
  if (documentoEncontrado) {
    res.status(200).json(documentoEncontrado); // Si se encuentra el usuario, devuelve sus datos
  } else {
    res.status(404).json({ error: "No se puedo ejecutar la acción" }); // Si no se encuentra, devuelve un mensaje de error
  }
});

//CONSULTA TODOS LOS PRODUCTOS: Se define una ruta GET para obtener todos los productos
app.get("/productos", async (req, res) => {
  let listaProductos = await modeloProducto.find();
  if (listaProductos) {
    res.status(200).json(listaProductos); // Si se encuentran productos, devuelve la lista
  } else {
    res.status(404).json({ mensaje: "No se puedo ejecutar la acción" }); // Si no hay productos, devuelve un mensaje de error
  }
});

/*****************************************************
 *                                                   *
 *                     INSERCIÓN                     *
 *                                                   *
 *****************************************************/

//INSERCIÓN DE USUARIOS: Se define una ruta POST para insertar un nuevo usuario
app.post("/usuarios", async (req, res) => {
  const nuevoUsuario = new modeloUsuario({
    documento: req.body.documento,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
  });

  nuevoUsuario
    .save()
    .then((usuario) => {
      console.log("Cliente creado: ", usuario);
    })
    .catch((err) => {
      console.log("Error al crear cliente: ", err);
    });
  res.json("Registro exitoso");
});


app.listen(process.env.PORT, () => {
  console.log("Servidor en linea");
});
// Inicia el servidor en el puerto especificado en las variables de entorno y muestra un mensaje en la consola

// INSERCIÓN DE PRODUCTOS: Se define una ruta POST para insertar un nuevo producto
app.post("/productos", async (req, res) => {
  const nuevoProducto = new modeloProducto({
    referencia: req.body.referencia,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado,
  });

  nuevoProducto
    .save()
    .then((producto) => {
      console.log("Producto creado: ", producto);
      res.status(201).json({ mensaje: "Producto registrado exitosamente", producto });
    })
    .catch((err) => {
      console.log("Error al crear producto: ", err);
      res.status(500).json({ mensaje: "Error al registrar producto", detalle: err.message });
    });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor en linea");
});

/*****************************************************
 *                                                   *
 *                 ACTUALIZACIÓN                     *
 *                                                   *
 *****************************************************/

//ACTUALIZACIÓN DE USUARIOS: Se define una ruta PUT para actualizar un usuario existente
app.put("/usuarios/:ref", async (req, res) => {
  const usuarioActualizado = {
    documento: req.params.ref,
    nombreCompleto: req.body.nombreCompleto,
    FNacimiento: req.body.FNacimiento,
    //body: req.body es un objeto que contiene los datos del usuario a actualizar
  };
  let Actualizacion = await modeloUsuario.findOneAndUpdate(
    { documento: req.params.ref },
    usuarioActualizado
  );
  if (Actualizacion) {
    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
});



/*::::::::::::::::::::::::::::::::::::::::::::::::*/
app.put('/usuarios/:email', async (req, res) => {
  let usuarioEditado = {
    /*no pon el req*/
    nombre: req.params.nombre,
    edad: req.body.edad,
    correo: req.params.email
  }
  //no tiene await
  let resultado = await modelo.findOneAndUpdate({ correo: req.params.email }, usuarioEditado)
  if (resultado) {
    //se ponen estados http
    res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
})
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::*/



// ACTUALIZACIÓN DE PRODUCTOS: Se define una ruta PUT para actualizar un producto existente
app.put("/productos/:ref", async (req, res) => {
  const productoActualizado = {
    referencia: req.params.ref,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    stock: req.body.stock,
    imagen: req.body.imagen,
    habilitado: req.body.habilitado,
  };

  let actualizacionProducto = await modeloProducto.findOneAndUpdate(
    { referencia: req.params.ref },
    productoActualizado
  );

  if (actualizacionProducto) {
    res.status(200).json({ mensaje: "Producto actualizado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

/*****************************************************
 *                                                   *
 *                   ELIMINACIÓN                     *
 *                                                   *
 *****************************************************/

//ELIMINACIÓN DE USUARIOS: Se define una ruta DELETE para eliminar un usuario existente
app.delete("/usuarios/:id", async (req, res) => {
  /*console.log(req.params.id, req.body.documento);*/
  let usuarioEliminado = await modeloUsuario.findOneAndDelete({
    _id: req.params.id,
  });
  if (usuarioEliminado) {
    res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  }
});

// ELIMINACIÓN DE PRODUCTOS: Se define una ruta DELETE para eliminar un producto existente
app.delete("/productos/:ref", async (req, res) => {
  console.log(req.params.ref, req.body.referencia);
  let productoEliminado = await modeloProducto.findOneAndDelete({
    referencia: req.params.ref,
  });

  if (productoEliminado) {
    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } else {
    res.status(404).json({ mensaje: "Producto no encontrado" });
  }
});

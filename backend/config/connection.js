const mongoose = require('mongoose');

// se importa la uri de mongo, y se reemplaza el usuario y contraseña por las variables de entorno en .env
const URI =`mongodb+srv://${process.env.USER_BD}:${process.env.PASS_BD}@cluster0.buuk8nn.mongodb.net/${process.env.DB_NAME}`

mongoose.connect(URI);

module.exports = mongoose;

const express = require("express") //Importo express
const mongoose = require("mongoose") //Importo mongoose
const app = express() //Creo la app con express
const bodyParser = require("body-parser") //Importo body-parser
// RUTAS
const rutaUsuarios = require("./routes/usuario.routes") //Importo las rutas de los usuarios
const rutaCoches = require("./routes/coche.routes") //Importo las rutas de los coches

// MIDDLEWARE
app.use(express.json()) //Middleware para que la app pueda entender JSON
app.use("/api/coches", rutaCoches) //Middleware para que la app pueda usar las rutas de los coches
app.use("/api/usuarios", rutaUsuarios) //Middleware para que la app pueda usar las rutas de los usuarios
app.use(bodyParser.urlencoded()) //Middleware para que la app pueda entender URL

// CONEXIÓN A MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/bbdd-coches-2526") //Conecto a MongoDB
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch(() => console.log("Error al conectar a MongoDB"));

// ARRANCO EL SERVIDOR
app.listen(3000, () => console.log("Node arrancado por el puerto 3000")) //Arranco el servidor


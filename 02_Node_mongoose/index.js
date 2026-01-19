const express = require("express")
const mongoose = require("mongoose")
const app = express()

//Importo la ruta
const ruta = require("./routes/coche.routes")

//Middleware
app.use(express.json())
app.use("/api/coches", ruta)

//Rutas
app.get("/saludo", (req, res) => {
    res.status(200).send("Hola me llamo Juan y soy tu alumno ")
})

mongoose.connect("mongodb://127.0.0.1:27017/bbdd-coches-2526")
    .then(() => console.log("Conexión exitosa a MongoDB"))
    .catch(() => console.log("Error al conectar a MongoDB"));


app.listen(3000, () => console.log("Node arrancado por el puerto 3000"))


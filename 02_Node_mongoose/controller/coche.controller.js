const CocheModel = require("../model/coche.models"); //Importo el modelo
const coches = require("../bbdd/coche.bbdds"); //Importo los coches

const findByMarca = async (req, res) => {
    const result = await CocheModel.find({ marca: req.params.marca }) //Busca todos los coches que tengan la marca que se pasa por parámetro, req.params.marca es el parámetro que se pasa por la URL que se define en mi modelo
    return res.status(200).send(result) //Devuelve el resultado
}

const cargaInicial = async (req, res) => {
    CocheModel.insertMany(coches) //Inserta todos los coches que vienen en el array coches
    return res.status(200).send("Coches cargados correctamente")
}

const findAll = async (req, res) => {
    const result = await CocheModel.find() //Busca todos los coches
    return res.status(200).send(result) //Devuelve el resultado
}

const findByPrecioGreaterThan = async (req, res) => {
    const result = await CocheModel.find({ precio: { $gt: req.params.precio } }) //Busca todos los coches que tengan un precio mayor que el que se pasa por parámetro, $gt: es un operador de mongoose que significa "mayor que"
    return res.status(200).send(result) //Devuelve el resultado 
}

const findById = async (req, res) => {
    try {
        const result = await CocheModel.findById(req.params.id) //Busca el coche por su id
        return res.status(200).send(result) //Devuelve el resultado
    } catch (error) { //Si no encuentra el coche, devuelve un error 500
        return res.status(500).send("Coche no encontrado") //Devuelve el error
    }
}

module.exports = {
    findById,
    findByMarca,
    cargaInicial,
    findAll,
    findByPrecioGreaterThan
}

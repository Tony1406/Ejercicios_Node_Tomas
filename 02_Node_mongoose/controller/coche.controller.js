const CocheModel = require("../model/coche.models"); //Importo el modelo
const coches = require("../bbdd/coche.bbdds"); //Importo los coches
const mongoose = require("mongoose");


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

const insertOne = async (req, res) => {
    try {
        const coche = req.body;
        const cocheNuevo = new CocheModel(coche)
        const result = await cocheNuevo.save() //await se usa siempre que se use una promesa, 
        return res.status(200).send(result)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error al insertar el coche")
    }
}

const updatedOne = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send("Id no válido")
        }
        const coche = req.body;
        const cocheActualizado = await CocheModel.findByIdAndUpdate(req.params.id, coche, { new: true, runValidators: true })
        return res.status(200).send(cocheActualizado)
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error al actualizar el coche")
    }
}

const deleteOne = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).send("Id no válido")
        }
        const cocheEliminado = await CocheModel.findByIdAndDelete(req.params.id)
        if (!cocheEliminado) {
            return res.status(404).send("Coche no encontrado")
        }
        return res.status(200).send({ message: "Coche eliminado correctamente", coche: cocheEliminado })
    } catch (error) {
        console.error(error)
        return res.status(500).send("Error al eliminar el coche")
    }
}

module.exports = {
    findById,
    findByMarca,
    cargaInicial,
    findAll,
    findByPrecioGreaterThan,
    insertOne,
    updatedOne,
    deleteOne
}

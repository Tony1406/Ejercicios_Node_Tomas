const express = require("express");
const router = express.Router();
const Coche = require("../model/coche.models");
const coches = require("../bbdd/coche.bbdds");

const cargaInicial = async (req, res) => {
    try {
        await Coche.insertMany(coches)
        return res.status(200).send("Coches cargados correctamente")
    } catch (error) {
        return res.status(500).send(error)
    }
}

module.exports = cargaInicial

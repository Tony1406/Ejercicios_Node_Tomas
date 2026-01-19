const express = require("express");
const ruta = express.Router();
const CocheModel = require("../model/coche.models");
const cochesController = require("../controller/coche.controller");

ruta.get("/cargaInicial", cochesController.cargaInicial);


module.exports = ruta
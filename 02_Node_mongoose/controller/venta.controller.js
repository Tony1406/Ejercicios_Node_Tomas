const VentaModel = require("../model/venta.models.js");
const CocheModel = require("../model/coche.models.js");
const UsuarioModel = require("../model/usuario.models.js");

class VentaController {

    async registroVenta(req, res) {
        try {
            const usuarioVenta = await UsuarioModel.findById(req.body.usuarioId);
            if (!usuarioVenta)
                return res.status(404).send("usuario no existe")
            const cocheVenta = await CocheModel.findById(req.body.idCoche);
            if (!cocheVenta)
                return res.status(404).send("coche no existe")
            if (cocheVenta.isVendido)
                return res.status(400).send("coche vendido")
            const ventaNueva = new VentaModel({
                usuario: { _id: usuarioVenta._id },
                coche: { _id: cocheVenta._id },
                precio: cocheVenta.precio
            });
            const resultVenta = await ventaNueva.save();
            cocheVenta.isVendido = true;

            const resultCoche = await cocheVenta.save();
            res.status(201).json({ mensaje: "venta registrada", resultVenta, resultCoche });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al registrar la venta");
        }
    }

}

module.exports = new VentaController();
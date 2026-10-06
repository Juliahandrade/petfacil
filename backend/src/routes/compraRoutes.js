const express = require("express");
const Compra = require("../models/Compra");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const compra = await Compra.create(req.body);

        res.status(201).json({
        success: true,
        message: "Compra registrada com sucesso.",
        compra
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao registrar compra."
        });
    }
    });

    router.get("/", async (req, res) => {
    try {
        const compras = await Compra.find()
        .populate("usuario")
        .populate("produto");

        res.json({
        success: true,
        compras
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao buscar compras."
        });
    }
});

module.exports = router;
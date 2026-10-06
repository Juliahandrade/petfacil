const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const produto = await Product.create(req.body);

        res.status(201).json({
        success: true,
        message: "Produto cadastrado com sucesso.",
        produto
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao cadastrar produto."
        });
    }
    });

    router.get("/", async (req, res) => {
    try {
        const produtos = await Product.find();

        res.json({
        success: true,
        produtos
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao buscar produtos."
        });
    }
});

module.exports = router;
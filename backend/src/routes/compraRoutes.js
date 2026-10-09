
const express = require("express");
const mongoose = require("mongoose");
const Compra = require("../models/Compra");
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// REGISTRAR COMPRA — exige autenticação
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { produto, preco, dataCompra } = req.body;

        // Validar os dados da compra
        if (
            !mongoose.isValidObjectId(produto) ||
            preco === undefined ||
            preco === null ||
            preco === "" ||
            !Number.isFinite(Number(preco)) ||
            Number(preco) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Informe um produto válido e um preço válido."
            });
        }

        // Verificar se o produto existe
        const produtoExistente = await Product.findById(produto);

        if (!produtoExistente) {
            return res.status(404).json({
                success: false,
                message: "Produto não encontrado."
            });
        }

        // Validar a data, caso tenha sido informada
        let dataValida;

        if (dataCompra !== undefined) {
            dataValida = new Date(dataCompra);

            if (Number.isNaN(dataValida.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: "Data da compra inválida."
                });
            }
        }

        // O usuário vem do token e o nome vem do produto cadastrado,
        // não do corpo da requisição
        const dadosCompra = {
            usuario: req.usuarioId,
            produto,
            nomeProduto: produtoExistente.nome,
            preco: Number(preco)
        };

        if (dataValida) {
            dadosCompra.dataCompra = dataValida;
        }

        const compra = await Compra.create(dadosCompra);

        return res.status(201).json({
            success: true,
            message: "Compra registrada com sucesso.",
            compra
        });

    } catch (error) {
        console.error("Erro ao registrar compra:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao registrar compra."
        });
    }
});

// LISTAR SOMENTE AS COMPRAS DO USUÁRIO AUTENTICADO
router.get("/", authMiddleware, async (req, res) => {
    try {
        const compras = await Compra.find({
            usuario: req.usuarioId
        })
            .populate("usuario", "nomeCompleto login")
            .populate("produto");

        return res.status(200).json({
            success: true,
            compras
        });

    } catch (error) {
        console.error("Erro ao buscar compras:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar compras."
        });
    }
});

module.exports = router;

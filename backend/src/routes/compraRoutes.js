
const express = require("express");
const mongoose = require("mongoose");
const Compra = require("../models/Compra");
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { itens, produto, quantidade = 1, dataCompra } = req.body;

        const listaItens = Array.isArray(itens)
            ? itens
            : [{ produto, quantidade }];

        if (listaItens.length === 0) {
            return res.status(400).json({
                success: false,
                message: "O pedido precisa ter pelo menos um produto."
            });
        }

        for (const item of listaItens) {
            if (
                !mongoose.isValidObjectId(item.produto) ||
                !Number.isInteger(Number(item.quantidade ?? 1)) ||
                Number(item.quantidade ?? 1) < 1
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Informe produtos e quantidades válidos."
                });
            }
        }

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

        let comprasRegistradas = [];

        await session.withTransaction(async () => {
            const dadosCompras = [];

            for (const item of listaItens) {
                const produtoExistente = await Product.findById(
                    item.produto
                ).session(session);

                if (!produtoExistente) {
                    throw new Error(`Produto não encontrado: ${item.produto}`);
                }

                const precoPromocional = produtoExistente.precoPromocional;

                const precoUnitario =
                    precoPromocional != null &&
                    precoPromocional < produtoExistente.precoAtual
                        ? precoPromocional
                        : produtoExistente.precoAtual;

                const dadosCompra = {
                    usuario: req.usuarioId,
                    produto: produtoExistente._id,
                    nomeProduto: produtoExistente.nome,
                    quantidade: Number(item.quantidade ?? 1),
                    preco: precoUnitario
                };

                if (dataValida) {
                    dadosCompra.dataCompra = dataValida;
                }

                dadosCompras.push(dadosCompra);
            }

            comprasRegistradas = await Compra.insertMany(
                dadosCompras,
                { session }
            );
        });

        return res.status(201).json({
            success: true,
            message: "Pedido registrado com sucesso.",
            compras: comprasRegistradas
        });
    } catch (error) {
        console.error("Erro ao registrar pedido:", error.message);

        const produtoNaoEncontrado = error.message.startsWith(
            "Produto não encontrado:"
        );

        return res.status(produtoNaoEncontrado ? 404 : 500).json({
            success: false,
            message: produtoNaoEncontrado
                ? "Um dos produtos do pedido não foi encontrado."
                : "Erro ao registrar pedido."
        });
    } finally {
        await session.endSession();
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const compras = await Compra.find({
            usuario: req.usuarioId
        })
            .populate("usuario", "nomeCompleto login")
            .populate("produto")
            .sort({ dataCompra: -1 });

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

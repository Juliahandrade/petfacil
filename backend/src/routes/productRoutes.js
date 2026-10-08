
const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CADASTRAR PRODUTO — exige autenticação
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            nome,
            precoAtual,
            precoPromocional,
            tipo,
            descricao,
            dataValidade
        } = req.body;

        // Validar campos obrigatórios
        if (
            typeof nome !== "string" ||
            !nome.trim() ||
            typeof tipo !== "string" ||
            !tipo.trim() ||
            typeof descricao !== "string" ||
            !descricao.trim() ||
            precoAtual === undefined ||
            precoAtual === null ||
            precoAtual === "" ||
            !Number.isFinite(Number(precoAtual)) ||
            Number(precoAtual) < 0 ||
            !dataValidade ||
            Number.isNaN(new Date(dataValidade).getTime())
        ) {
            return res.status(400).json({
                success: false,
                message: "Informe todos os campos obrigatórios com valores válidos."
            });
        }

        // Validar preço promocional, caso informado
        if (
            precoPromocional !== undefined &&
            precoPromocional !== null &&
            (
                precoPromocional === "" ||
                !Number.isFinite(Number(precoPromocional)) ||
                Number(precoPromocional) < 0
            )
        ) {
            return res.status(400).json({
                success: false,
                message: "O preço promocional deve ser um número válido e não negativo."
            });
        }

        const dadosProduto = {
            nome: nome.trim(),
            precoAtual: Number(precoAtual),
            tipo: tipo.trim(),
            descricao: descricao.trim(),
            dataValidade: new Date(dataValidade)
        };

        if (
            precoPromocional !== undefined &&
            precoPromocional !== null &&
            precoPromocional !== ""
        ) {
            dadosProduto.precoPromocional = Number(precoPromocional);
        }

        const produto = await Product.create(dadosProduto);

        return res.status(201).json({
            success: true,
            message: "Produto cadastrado com sucesso.",
            produto
        });

    } catch (error) {
        console.error("Erro ao cadastrar produto:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar produto."
        });
    }
});

// LISTAR PRODUTOS — consulta pública
router.get("/", async (req, res) => {
    try {
        const produtos = await Product.find();

        return res.status(200).json({
            success: true,
            produtos
        });

    } catch (error) {
        console.error("Erro ao buscar produtos:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar produtos."
        });
    }
});

module.exports = router;

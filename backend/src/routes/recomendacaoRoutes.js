
const express = require("express");
const Compra = require("../models/Compra");
const Product = require("../models/Product");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

const LIMITE_PADRAO = 5;
const LIMITE_MAXIMO = 20;

// Peso de cada compra de um tipo na pontuação do produto
const PESO_TIPO = 10;

// Normaliza o tipo para comparar "Ração", "ração " e "RAÇÃO" como iguais
function normalizarTipo(tipo) {
    return String(tipo || "").trim().toLowerCase();
}

// Percentual de desconto do produto (0 quando não está em promoção)
function calcularDesconto(produto) {
    if (
        typeof produto.precoPromocional !== "number" ||
        produto.precoAtual <= 0 ||
        produto.precoPromocional >= produto.precoAtual
    ) {
        return 0;
    }

    return Math.round(
        ((produto.precoAtual - produto.precoPromocional) / produto.precoAtual) * 100
    );
}

// RECOMENDAÇÕES PERSONALIZADAS DO USUÁRIO AUTENTICADO
router.get("/", authMiddleware, async (req, res) => {
    try {
        // Validar o limite, caso informado
        let limite = LIMITE_PADRAO;

        if (req.query.limite !== undefined) {
            limite = Number(req.query.limite);

            if (!Number.isInteger(limite) || limite < 1) {
                return res.status(400).json({
                    success: false,
                    message: "O limite deve ser um número inteiro maior que zero."
                });
            }

            limite = Math.min(limite, LIMITE_MAXIMO);
        }

        // Histórico de compras do usuário
        const compras = await Compra.find({
            usuario: req.usuarioId
        }).populate("produto", "tipo");

        // Contar quantas compras o usuário fez de cada tipo
        const comprasPorTipo = {};

        compras.forEach((compra) => {
            if (!compra.produto) {
                return;
            }

            const tipo = normalizarTipo(compra.produto.tipo);
            comprasPorTipo[tipo] = (comprasPorTipo[tipo] || 0) + 1;
        });

        const possuiHistorico = Object.keys(comprasPorTipo).length > 0;

        // Considerar apenas produtos dentro da validade
        const produtos = await Product.find({
            dataValidade: { $gte: new Date() }
        });

        // Pontuar cada produto: tipos mais comprados pesam mais e promoções ganham bônus
        const recomendacoes = produtos
            .map((produto) => {
                const comprasDoTipo = comprasPorTipo[normalizarTipo(produto.tipo)] || 0;
                const desconto = calcularDesconto(produto);
                const tipo = String(produto.tipo).trim();

                let motivo;

                if (comprasDoTipo > 0 && desconto > 0) {
                    motivo = `Você costuma comprar ${tipo} e este item está com ${desconto}% de desconto.`;
                } else if (comprasDoTipo > 0) {
                    motivo = `Você costuma comprar ${tipo}.`;
                } else if (desconto > 0) {
                    motivo = `Em promoção: ${desconto}% de desconto.`;
                }

                return {
                    produto,
                    pontuacao: comprasDoTipo * PESO_TIPO + desconto,
                    desconto,
                    motivo
                };
            })
            // Sem relação com o histórico nem promoção, o produto não é recomendado
            .filter((item) => item.motivo)
            .sort((a, b) => b.pontuacao - a.pontuacao)
            .slice(0, limite);

        return res.status(200).json({
            success: true,
            baseadoEmHistorico: possuiHistorico,
            recomendacoes
        });

    } catch (error) {
        console.error("Erro ao gerar recomendações:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao gerar recomendações."
        });
    }
});

module.exports = router;


const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// CADASTRO DE USUÁRIO
router.post("/", async (req, res) => {
    try {
        const { nomeCompleto, cpf, login, senha } = req.body;

        if (
            typeof nomeCompleto !== "string" ||
            !nomeCompleto.trim() ||
            typeof cpf !== "string" ||
            !cpf.trim() ||
            typeof login !== "string" ||
            !login.trim() ||
            typeof senha !== "string" ||
            !senha.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos são obrigatórios."
            });
        }

        const usuarioExistente = await User.findOne({
            $or: [
                { cpf: cpf.trim() },
                { login: login.trim() }
            ]
        });

        if (usuarioExistente) {
            return res.status(409).json({
                success: false,
                message: "CPF ou login já cadastrado."
            });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const usuario = await User.create({
            nomeCompleto: nomeCompleto.trim(),
            cpf: cpf.trim(),
            login: login.trim(),
            senha: senhaHash
        });

        const usuarioResposta = usuario.toObject();
        delete usuarioResposta.senha;

        return res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso.",
            usuario: usuarioResposta
        });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "CPF ou login já cadastrado."
            });
        }

        console.error("Erro ao cadastrar usuário:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao cadastrar usuário."
        });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { login, senha } = req.body;

        if (
            typeof login !== "string" ||
            !login.trim() ||
            typeof senha !== "string" ||
            !senha
        ) {
            return res.status(400).json({
                success: false,
                message: "Login e senha são obrigatórios."
            });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET não configurada no .env");

            return res.status(500).json({
                success: false,
                message: "Erro na configuração de autenticação."
            });
        }

        const usuario = await User.findOne({
            login: login.trim()
        });

        if (!usuario) {
            return res.status(401).json({
                success: false,
                message: "Login ou senha inválidos."
            });
        }

        const senhaValida = await bcrypt.compare(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                success: false,
                message: "Login ou senha inválidos."
            });
        }

        const token = jwt.sign(
            { id: usuario._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
        );

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso.",
            token,
            usuario: {
                id: usuario._id,
                nomeCompleto: usuario.nomeCompleto,
                login: usuario.login
            }
        });

    } catch (error) {
        console.error("Erro ao realizar login:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao realizar login."
        });
    }
});

// CONSULTAR O PRÓPRIO PERFIL
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const usuario = await User.findById(req.usuarioId)
            .select("-senha");

        if (!usuario) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado."
            });
        }

        return res.status(200).json({
            success: true,
            usuario
        });

    } catch (error) {
        console.error("Erro ao buscar perfil:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao buscar perfil."
        });
    }
});

// LISTAGEM COMPLETA DESABILITADA TEMPORARIAMENTE
router.get("/", authMiddleware, async (req, res) => {
    return res.status(403).json({
        success: false,
        message: "Listagem completa de usuários não está disponível."
    });
});

module.exports = router;

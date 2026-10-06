const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const usuario = await User.create(req.body);

        res.status(201).json({
        success: true,
        message: "Usuário cadastrado com sucesso.",
        usuario
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao cadastrar usuário."
        });
    }
    });

    router.get("/", async (req, res) => {
    try {
        const usuarios = await User.find();

        res.json({
        success: true,
        usuarios
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Erro ao buscar usuários."
        });
    }
});

module.exports = router;
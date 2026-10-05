const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    precoAtual: {
        type: Number,
        required: true
    },
    precoPromocional: {
        type: Number,
        required: false
    },
    tipo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataValidade: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
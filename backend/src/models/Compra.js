const mongoose = require("mongoose");

const compraSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    nomeProduto: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    preco: {
        type: Number,
        required: true
    },
    dataCompra: {
        type: Date,
        required: true,
        default: Date.now
    }
});

module.exports = mongoose.model("Compra", compraSchema);
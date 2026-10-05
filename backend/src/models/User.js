const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nomeCompleto: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        unique: true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("User", userSchema);
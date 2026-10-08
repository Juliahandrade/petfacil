
function errorMiddleware(err, req, res, next) {
    console.error("Erro na API:", err.message);

    if (res.headersSent) {
        return next(err);
    }

    // Erro de JSON inválido enviado na requisição
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        return res.status(400).json({
            success: false,
            message: "O JSON enviado é inválido."
        });
    }

    // Erro de validação do Mongoose
    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Os dados enviados são inválidos."
        });
    }

    // ID inválido do MongoDB
    if (err.name === "CastError") {
        return res.status(400).json({
            success: false,
            message: "Identificador inválido."
        });
    }

    // Erro inesperado
    return res.status(500).json({
        success: false,
        message: "Ocorreu um erro interno no servidor."
    });
}

module.exports = errorMiddleware;
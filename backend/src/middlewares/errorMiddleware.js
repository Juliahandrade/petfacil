function errorMiddleware(error, req, res, next) {
    console.error("Erro:", error);

    res.status(500).json({
        success: false,
        message: "Erro interno do servidor."
    });
}

module.exports = errorMiddleware;
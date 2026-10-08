
const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    // Verificar se o token foi enviado
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token de autenticação não informado."
        });
    }

    // Validar o formato Bearer <token>
    const partes = authHeader.split(" ");

    if (
        partes.length !== 2 ||
        partes[0] !== "Bearer" ||
        !partes[1]
    ) {
        return res.status(401).json({
            success: false,
            message: "Formato do token inválido."
        });
    }

    // Verificar se a chave secreta está configurada
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET não configurada no .env");

        return res.status(500).json({
            success: false,
            message: "Erro na configuração de autenticação."
        });
    }

    try {
        // Verificar assinatura e validade do token
        const dadosToken = jwt.verify(
            partes[1],
            process.env.JWT_SECRET
        );

        // Garantir que o token contenha um ID de usuário
        if (
            !dadosToken ||
            typeof dadosToken.id !== "string" ||
            !dadosToken.id
        ) {
            return res.status(401).json({
                success: false,
                message: "Token inválido."
            });
        }

        req.usuarioId = dadosToken.id;

        return next();

    } catch (error) {
        if (
            error.name === "TokenExpiredError" ||
            error.name === "JsonWebTokenError" ||
            error.name === "NotBeforeError"
        ) {
            return res.status(401).json({
                success: false,
                message: "Token inválido ou expirado."
            });
        }

        console.error("Erro na autenticação:", error.message);

        return res.status(500).json({
            success: false,
            message: "Erro ao verificar autenticação."
        });
    }
}

module.exports = authMiddleware;


require("dotenv").config();

const express = require("express");
const connectDatabase = require("./src/config/database");

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const compraRoutes = require("./src/routes/compraRoutes");
const recomendacaoRoutes = require("./src/routes/recomendacaoRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

// Interpretar requisições JSON
app.use(express.json());

// Rota inicial para verificar se a API está funcionando
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "PetFacil API funcionando!"
    });
});

// Registrar rotas da API
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/compras", compraRoutes);
app.use("/api/recomendacoes", recomendacaoRoutes);

// Tratar rotas inexistentes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Rota não encontrada."
    });
});

// Middleware global de tratamento de erros
app.use(errorMiddleware);

// Iniciar servidor após conectar ao banco
async function startServer() {
    try {
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar o servidor:", error.message);
        process.exit(1);
    }
}

startServer();
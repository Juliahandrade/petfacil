require("dotenv").config();

const express = require("express");
const connectDatabase = require("./src/config/database");

const userRoutes = require("./src/routes/userRoutes");
const productRoutes = require("./src/routes/productRoutes");
const compraRoutes = require("./src/routes/compraRoutes");
const errorMiddleware = require("./src/middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/compras", compraRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "PetFacil API funcionando!"
    });
});

app.use(errorMiddleware);

async function startServer() {
    await connectDatabase();

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}

startServer();
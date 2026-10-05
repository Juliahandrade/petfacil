require("dotenv").config();

const connectDatabase = require("./src/config/database");

async function startServer() {
    await connectDatabase();

    console.log("Backend iniciado!");
    }

startServer();
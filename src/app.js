import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"

const app = express();

app.use(cors());
app.use(express.json());

app.get('/teste', (req, res) => {
    console.log('🌟 Requisição recebida na rota /teste');
    res.status(200).send('Rota de teste funcionando!');
});

app.use("/user", userRoutes);
export default app;
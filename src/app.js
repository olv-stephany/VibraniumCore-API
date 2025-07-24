import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import investimentRoutes from "./routes/investimentRoutes.js"
import movementRoutes from "./routes/movementRoutes.js"
import walletRoutes from './routes/walletRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes)
app.use("/user", userRoutes);
app.use("/investment", investimentRoutes);
app.use("/movements", movementRoutes);
app.use('/wallet', walletRoutes);

export default app;
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from './config/db';

import authRoutes from './routes/auth.routes';


dotenv.config();
connectDB();

const app = express();
const BASE_URL = "/api";

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(BASE_URL + "/auth", authRoutes);

export default app;

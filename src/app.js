import express from "express";
import { router as authRouter } from "./routes/authRoutes.js";
const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

export { app };

import express from "express";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as mealRouter } from "./routes/mealRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/meals", mealRouter);

export { app };

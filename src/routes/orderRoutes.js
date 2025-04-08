import express from "express";
import orderController from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, orderController.getAllOrders);
router.post("/", protect, orderController.addOrder);

export { router };

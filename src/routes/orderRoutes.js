import express from "express";
import orderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.getAllOrders);
router.post("/", orderController.addOrder);

export { router };

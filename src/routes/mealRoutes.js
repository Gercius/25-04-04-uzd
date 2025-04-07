import express from "express";
import mealController from "../controllers/mealController.js";

const router = express.Router();

router.get("/", mealController.getAllMeals);
router.post("/", mealController.addMeal);
router.delete("/:id", mealController.deleteMeal);

export { router };

import { Meal } from "../models/Meal.js";

const getAllMeals = async (req, res) => {
    try {
        const meals = await Meal.find();

        if (!meals.length) {
            return res.status(404).json({
                status: "Failed",
                message: "No meals found",
            });
        }

        res.status(200).json({
            status: "Success",
            results: meals.length,
            data: meals,
        });
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const addMeal = async (req, res) => {
    try {
        if (!req.body.meal) req.body.meal = req.params.mealId;

        const newMeal = await Meal.create(req.body);

        res.status(201).json({
            status: "success",
            message: "New meal added",
            data: { newMeal },
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const deleteMeal = async (req, res) => {
    try {
        await Meal.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};

export default { getAllMeals, addMeal, deleteMeal };

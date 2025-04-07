import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        unique: [true, "Title must be unique"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    date: {
        type: Date,
        required: [true, "Date is required"],
    },
    available: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Meal = mongoose.model("Meal", mealSchema);
export { Meal };

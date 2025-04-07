import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    mealId: {
        type: mongoose.Schema.ObjectId,
        required: [true, "Meal is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Order = mongoose.model("Order", orderSchema);
export { Order };

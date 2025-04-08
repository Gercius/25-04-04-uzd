import { Order } from "../models/Order.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });

        if (!orders.length) {
            return res.status(404).json({
                status: "Failed",
                message: "No orders found",
            });
        }

        res.status(200).json({
            status: "Success",
            results: orders.length,
            data: orders,
        });
    } catch (error) {
        res.status(404).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const addOrder = async (req, res) => {
    // Get day in 01 format
    const currentDay = new Date().toLocaleDateString(undefined, {
        day: "2-digit",
    });

    try {
        const orderDates = await Order.find({ userId: req.user.id }, { createdAt: 1 });

        const currentDayOrder = orderDates.find((order) => order.createdAt.toISOString().slice(8, 10) == currentDay);
        if (currentDayOrder) throw new Error("Today's order already exists");

        if (!req.body.order) req.body.order = req.params.OrderId;

        const newOrder = await Order.create(req.body);

        res.status(201).json({
            status: "success",
            message: "New order added",
            data: { newOrder },
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};

export default { getAllOrders, addOrder };

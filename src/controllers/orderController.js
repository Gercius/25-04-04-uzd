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
    try {
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

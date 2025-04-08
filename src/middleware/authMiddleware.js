import { promisify } from "node:util";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const protect = async (req, res, next) => {
    let token;
    console.log(req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    console.log(1);

    try {
        if (!token || token === "undefined" || token === undefined) throw new Error("User not authentificated");
        console.log(token, process.env.JWT_SECRET);

        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        console.log(2);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) throw new Error("User not found");
        console.log(3);

        if (currentUser.changedPasswordAfter(decoded.iat))
            throw new Error("User changed password. Please, login again");

        console.log(4);
        req.user = currentUser;

        next();
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            error: error.message,
        });
        console.log(error.message);
    }
};

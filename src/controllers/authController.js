import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const signup = async (req, res) => {
    console.log("signup");

    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        });

        const token = signToken(newUser._id);

        res.status(201).json({
            status: "Success",
            data: newUser,
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};

const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) throw new Error("Please provide username and passowrd");

        const user = await User.findOne({ username }).select("+password");
        console.log("password", password);
        console.log("user.password", user.password);
        console.log("password === user.password", password === user.password);

        if (!user || !(await user.correctPassword(password, user.password))) {
            throw new Error("Incorrect username or password");
        }

        const token = signToken(user._id);
        console.log(token);

        res.status(201).json({
            data: {
                id: user._id,
                username: user.username,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};

export default { signup, signin };

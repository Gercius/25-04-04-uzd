import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: [true, "Username must be unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Please confirm your password"],
        minlength: 8,
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords do not match",
        },
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

const User = mongoose.model("User", userSchema);
export { User };

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
});

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
export { User };

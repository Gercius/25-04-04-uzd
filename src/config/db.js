import "dotenv/config";
import mongoose from "mongoose";

// prettier-ignore
const DB = process.env.DATABASE_URI
    .replace("<db_password>", process.env.DATABASE_PASSWORD)
    .replace("<database>", process.env.DATABASE);

export const connectToDb = () => {
    mongoose.connect(DB).then(() => {
        console.log("Connected to a database:", process.env.DATABASE);
    });
};

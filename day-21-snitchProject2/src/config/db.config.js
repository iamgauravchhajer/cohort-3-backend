import mongoose from "mongoose";
import { config } from "./env.config.js";

export const connectToDb = () => {
    try {
        mongoose.connect(config.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
}

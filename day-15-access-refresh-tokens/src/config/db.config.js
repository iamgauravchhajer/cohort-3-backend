import mongoose from "mongoose";
import config from "./config.js";

const connectToDB = async () => {
    try {
        const connection = await mongoose.connect(config.MONGO_URI)
        console.log(`MongoDB connected`)
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`)
    }
}

export default connectToDB
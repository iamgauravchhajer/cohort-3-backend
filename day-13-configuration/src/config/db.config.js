import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log(`connected to DB`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
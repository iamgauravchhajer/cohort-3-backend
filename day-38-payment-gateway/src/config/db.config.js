const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

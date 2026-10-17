const mongoose = require('mongoose');
const ENV = require('./env.config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(ENV.MONGO_URI);
    console.log(`MongoDB Connected successfully`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

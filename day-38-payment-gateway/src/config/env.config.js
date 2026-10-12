const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/razorpay",
  RZP_KEY_ID: process.env.RAZORPAY_KEY_ID,
  RZP_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET
};

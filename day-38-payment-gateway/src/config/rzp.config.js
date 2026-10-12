const Razorpay = require("razorpay");
const { RZP_KEY_ID, RZP_KEY_SECRET } = require("./env.config");

const razorpay = new Razorpay({
  key_id: RZP_KEY_ID,
  key_secret: RZP_KEY_SECRET,
});

module.exports = razorpay;
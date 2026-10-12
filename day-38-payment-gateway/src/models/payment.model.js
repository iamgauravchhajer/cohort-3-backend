const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    orderId:   { type: String, required: true, unique: true },
    paymentId: { type: String },
    signature: { type: String },
    amount:    { type: Number, required: true },   // in paise
    currency:  { type: String, default: "INR" },
    product:   { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    status:    { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            default: "INR",
        },
    },
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

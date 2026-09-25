import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1
            },
            size: {
                type: String,
                enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                required: true
            }
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true})

const cartModel = mongoose.model('cart', cartSchema);

export default cartModel;
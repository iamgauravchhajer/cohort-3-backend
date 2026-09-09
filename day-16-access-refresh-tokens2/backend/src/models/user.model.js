import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "minimum 3 chars required"],
        maxlength: [40, 'maximum 40 chars are allowed']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Please provide a valid email address"
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: [3, "minimum 3 chars required"],
    },
    refreshToken: {
        type: String,
        default: null
    }
})

export const userModel = mongoose.model('authentication', userSchema)
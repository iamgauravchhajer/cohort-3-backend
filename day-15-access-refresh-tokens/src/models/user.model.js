import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    },
    refreshToken: {
        type: String,
        default: null
    }
})

const userModel = mongoose.model("token_auth", userSchema)

export default userModel




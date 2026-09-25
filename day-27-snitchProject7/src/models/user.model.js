import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required:true,
    },
    passwordHash:{
        type: String,
        required:true,
    },
    role: {
        type: String,
        enum:["seller","user"],
        default:"user"
    },
    refreshToken: {
        type: String,
        default: null
    }
},{timestamps:true})

export const userModel = mongoose.model("user",userSchema);
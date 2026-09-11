import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    uniqueCode:{
        type:String,
        required: true,
        unique: true
    },
    clickCount: {
        type: Number,
        required: true,
        default: 0
    } 
})

const urlModel = mongoose.model('url', urlSchema);

export default urlModel
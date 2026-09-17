import mongoose from 'mongoose'
import { config } from "./env.config.js"

export const connectToDb = () => {
    try {
        mongoose.connect(config.MONGO_URI)
        console.log('connted to DB')
    } catch (error) {
        console.log(error.message)
    }
}
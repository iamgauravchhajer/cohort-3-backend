import mongoose from 'mongoose'
import { config } from './env.config.js'

export const connectToDB = ()=>{
    try{
    mongoose.connect(config.MONGO_URI)
    console.log("connected to DB")
    } catch(error) {
        console.log(error.message)
    }
}

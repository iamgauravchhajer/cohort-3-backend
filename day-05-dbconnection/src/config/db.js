const mongoose = require('mongoose')

const connectToDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('connected to Db')
    } catch (error) {
        console.log(error.message)
    }   
}

module.exports = connectToDb;
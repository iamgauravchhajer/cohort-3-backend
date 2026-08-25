const mongoose = require('mongoose')

const connectToDb = () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
            .then(console.log('connected to DB'))
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = connectToDb
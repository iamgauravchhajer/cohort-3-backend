const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: [10, "minimum 10 characters required"]
    }
})

const noteModel = mongoose.model('note', noteSchema)

module.exports = noteModel
const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'minimum 10 characters required']
    }
})

const notesModel = mongoose.model('note', notesSchema)

module.exports = notesModel
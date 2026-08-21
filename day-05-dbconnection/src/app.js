const express = require('express')
const connectToDb = require('./config/db')
const notesModel = require('./models/note.model')

const app = express()
connectToDb()
app.use(express.json())

app.post('/create', async (req, res) => {
    const { title, description } = req.body
    const newNote = await notesModel.create({
        title,
        description
    })
    res.send({
        status: 'OK',
        message: 'note created successfully',
        data: newNote
    })
})

module.exports = app
const express = require('express')
const connectToDb = require('./config/db')
const notesRoute = require('./routes/notes.route')

const app = express()

connectToDb()

app.use(express.json())

app.use("/notes", notesRoute)

module.exports = app
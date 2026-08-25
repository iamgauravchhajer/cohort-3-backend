const express = require("express");
const cors = require('cors')
const connectToDb = require("./config/db");
const notesRoute = require('./routes/notes.routes');

const app = express()

connectToDb()

app.use(cors({
    origin: "http://localhost:5173"
}))

app.use(express.json())

app.use('/notes', notesRoute)

module.exports = app
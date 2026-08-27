const express = require("express");
const cors = require("cors")
const fileRouter = require("./routes/createUser.routes");

const app = express()

app.use(cors({
    origin: ['http://localhost:5173']
}))

app.use(express.json())

app.use('/api/v1', fileRouter)

module.exports = app
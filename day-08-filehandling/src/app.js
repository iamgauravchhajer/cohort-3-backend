const express = require('express')
const fileRoute = require('./routes/file.router')

const app = express()

app.use('/api/v1', fileRoute)

module.exports = app
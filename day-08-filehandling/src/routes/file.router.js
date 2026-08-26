const express = require('express')
const {healthController, filehandlingAPI} = require('../controllers/file.controller')
const {uploadToLocal, uploadToServer} = require('../config/multer')

const fileRoute = express.Router()

fileRoute.get('/health', healthController)

fileRoute.post('/upload/local', uploadToLocal.array('images'), filehandlingAPI)

fileRoute.post('/upload/server', uploadToServer.single('image'), filehandlingAPI)

module.exports = fileRoute
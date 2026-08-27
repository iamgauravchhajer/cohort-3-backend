const express = require("express");
const upload = require("../config/multer.config");
const createUserController = require("../controllers/createUser.controller");

const fileRouter = express.Router()

fileRouter.post('/user/create', upload.array('images', 10), createUserController)

module.exports = fileRouter
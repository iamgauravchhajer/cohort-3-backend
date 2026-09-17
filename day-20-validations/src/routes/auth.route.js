import express from 'express'
import { registerUserController } from '../controllers/auth.controllers.js'
import { registerValidation } from '../validator/auth.validator.js'

const authRouter = express.Router()

authRouter.post('/register', registerValidation, registerUserController)

export default authRouter
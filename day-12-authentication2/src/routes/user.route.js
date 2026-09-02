import express from 'express'
import { getProfileController, registerController, loginController } from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/auth/register', registerController)
authRouter.get('/auth/me', authMiddleware, getProfileController)
authRouter.post('/auth/login', loginController)

export default authRouter


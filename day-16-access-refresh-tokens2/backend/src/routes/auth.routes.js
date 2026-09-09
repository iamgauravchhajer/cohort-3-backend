import express from 'express'
import { getProfileController, refreshController, registerUserController } from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/register', registerUserController)
authRoute.get('/me', getProfileController)
authRoute.post('/refresh', refreshController)

export default authRoute
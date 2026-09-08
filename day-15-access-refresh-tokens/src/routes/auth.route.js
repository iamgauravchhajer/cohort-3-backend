import { Router } from 'express'
import { getProfileController, register, refresh } from '../controllers/auth.controller.js'

const router = Router()

router.post("/auth/register", register)
router.get('/auth/me', getProfileController)
router.post('/auth/refresh', refresh)

export default router
import { Router } from 'express'
import { generateUrl, redirectUrl } from '../controllers/url.controller.js'

const router = Router()

router.post('/generate', generateUrl)
router.get('/:code', redirectUrl)

export default router
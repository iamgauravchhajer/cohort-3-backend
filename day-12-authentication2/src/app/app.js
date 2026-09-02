import express from 'express'
import authRouter from '../routes/user.route.js'

const app = express()

app.use(express.json())

app.use('/api/v1/', authRouter)

export default app
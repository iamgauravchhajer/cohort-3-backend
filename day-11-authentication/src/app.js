import express from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())

app.post('/api/v1/register', (req, res) => {
    const {name, email, password} = req.body
    const token = jwt.sign({
        email, name, password
    }, 
    process.env.JWT_SECRET
    )
    res.status(200).json({
        message: "User registered successfully",
        data: {
            name, email, password
        },
        token: token
    })
})

export default app
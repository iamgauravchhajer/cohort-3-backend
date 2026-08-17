const express = require('express')

const app = express()

app.use(express.json()) // Middleware for accepting data from frontend.

app.get('/', (req, res) => {
    res.send('hello world from server!')
})

app.post('/create', (req, res) => {
    res.send({
        data: req.body,
        message: 'succesfull ✅'
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})
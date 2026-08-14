let http = require('http')

let app = http.createServer((req, res) => {
    res.end("server is created!")
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})
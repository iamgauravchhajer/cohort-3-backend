const app = require("./app/app");
const { createServer } = require("node:http")
const { Server } = require("socket.io")

const httpServer = createServer(app)

const io = new Server(httpServer)

io.on("connection", (socket) => {
    console.log("user connected", socket.id)

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id)
    })
})



httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
})
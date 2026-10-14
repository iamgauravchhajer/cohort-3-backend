const app = require("./app/app");
const { createServer } = require("node:http")
const initializeSocket = require("./sockets/socket.server")
const httpServer = createServer(app)

initializeSocket(httpServer)

httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
})
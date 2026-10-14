const { Server } = require("socket.io");

module.exports = function initializeSocket(httpServer) {

    const io = new Server(httpServer)

    io.on("connection", (socket) => {
        console.log("user connected", socket.id)

        socket.on("recieved", (msg) => {
            console.log(msg)

            io.emit("sent", msg)
        })

        socket.on("disconnect", () => {
            console.log("user disconnected", socket.id)
        })
    })


}
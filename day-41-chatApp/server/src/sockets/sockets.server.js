import { Server } from "socket.io";
import { verifyToken } from "../utils/jwt.js";

export default function (httpserver) {
    const io = new Server(httpserver, {
        cors: {
            origin: "*",
            credentials: true,
        },
    });

    io.use((socket, next) => {
        const token =
            socket.handshake.auth?.token ||
            socket.handshake.headers?.authorization?.split(" ")[1];

        if (!token) {
            return next(new Error("Authentication error"));
        }

        try {
            const decoded = verifyToken(token, "access");
            socket.user = decoded;
            next();
        } catch (error) {
            return next(new Error("Authentication error"));
        }
    });

    io.on("connection", (socket) => {
        console.log(`User Connected : ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`User Disconnected : ${socket.id}`);
        });

        socket.on("message", (data) => {
            console.log("Message:", data);
            socket.broadcast.emit("message", data);
        });
    });

    return io;
}
import express from "express";
import cors from "cors";
import postRoute from "./routes/post.routes.js";
import connectToDb from "./config/db.config.js";

const app = express();

connectToDb();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(express.json());

app.use('/api/v1/post', postRoute)

export default app;
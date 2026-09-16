import express from "express";
import router from "../routes/url.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/url', router);

export default app; 
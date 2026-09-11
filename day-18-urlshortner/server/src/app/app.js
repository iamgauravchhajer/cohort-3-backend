import express from "express";
import router from "../routes/url.routes.js";

const app = express();

app.use(express.json());

app.use('/api/url', router);

export default app; 
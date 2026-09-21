import express from "express";
import authRouter from "../routes/auth.routes.js";
import cookieParser from "cookie-parser";
import productRouter from "../routes/product.routes.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use('/api/products', productRouter);


export default app;
import express from "express";
import upload from "../config/multer.config.js";
import createPost from "../controllers/post.controller.js";

const postRoute = express.Router();

postRoute.post('/create', upload.single('image'), createPost);

export default postRoute;
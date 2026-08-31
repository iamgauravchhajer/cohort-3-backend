
import imagekit from "../config/imagekit.config.js";
import postModel from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const image = req.file
        const caption = req.body.caption

        const imageUpload = await imagekit.upload({
            file: image.buffer,
            fileName: image.originalname,
            folder: "posts"
        });

        const imageURL = imageUpload.url

        const newPost = await postModel.create({
            imageURL,
            caption
        });

        return res.status(201).json({
            message: "post created successfully",
            post: newPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to create post",
            error: error.message
        });
    }
};

export default createPost;
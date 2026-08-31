import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  { timestamps:  true}
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;

import { PostModel } from "../models/post.model.js";

export const createPost = async (input) => {
  const post = await PostModel.create(input);
  return post.toObject();
};

export const findPostByIdWithAuthor = async (id) => {
  const post = await PostModel.findById(id).populate("user", "name").lean();
  return post;
};

export const updatePostCaption = async (id, caption) => {
  const post = await PostModel.findByIdAndUpdate(id, { caption }, { new: true, runValidators: true })
    .populate("user", "name")
    .lean();
  return post;
};

import { body, param } from "express-validator";

export const createPostValidator = [
  body("caption")
    .isString().withMessage("Caption is required")
    .trim()
    .notEmpty().withMessage("Caption is required")
    .isLength({ max: 2200 }).withMessage("Caption must be at most 2200 characters"),
];

export const postIdValidator = [
  param("postId").isMongoId().withMessage("Invalid post id"),
];

export const updatePostValidator = [...postIdValidator, ...createPostValidator];

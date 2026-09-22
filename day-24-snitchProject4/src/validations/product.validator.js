import { body, validationResult } from "express-validator"

export const createProductValidator = [
    body("title")
        .exists().withMessage("Title is required").bail()
        .isString().withMessage("Title must be a string").bail()
        .trim()
        .isLength({ min: 2, max: 100 }).withMessage("Title length must be between 2 to 100 characters").bail()
        .isAlpha("en-US", { ignore: " " }).withMessage("Title can only have english small case and capital case character"),

    body("description")
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be String").bail()
        .trim()
        .isLength({ min: 20, max: 500 }).withMessage("Description length must be between 20 to 500 characters"),

    body("price.amount")
        .exists().withMessage("price amount is required").bail()
        .isFloat({ min: 0 }).withMessage("price amount must be a floating number and must be greater that 0"),

    body("price.currency")
        .exists().withMessage("Currency is required").bail()
        .isString().withMessage("Currency must be a string value")
        .isIn([ "INR", "USD" ]).withMessage("Currency either be INR or USD"),

    body('sizes')
        .exists().withMessage("Sizes is required").bail()
        .isArray().withMessage("Sizes must be an array").optional(),

    body('sizes.*.size')
        .exists().withMessage("Size is required").bail()
        .isString().withMessage("Size must be a string value").optional()
        .trim()
        .isIn([ "XS", "S", "M", "L", "XL", "XXL" ]).withMessage("Size must be one of XS, S, M, L, XL, XXL").optional(),

    body('sizes.*.stock')
        .exists().withMessage("Quantity is required").bail()
        .isInt({ min: 0 }).withMessage("Quantity must be a integer number and must be greater that 0").optional(),

    body("seller")
        .exists().withMessage("Seller is required").bail()
        .isMongoId().withMessage("Seller ID must be a valid mongo ID"),

    body("images")
        .exists().withMessage("Images is required").bail()
        .isArray().withMessage("Images must be an array"),

    body("images.*").isString().withMessage("Images must be a array of string").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("No images uploaded")
        }
        if (req.files.length > 5) {
            throw new Error("A product can have at most 5 images")
        }
        return true
    }),

    (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        return res.status(400).json({
            success: false,
            message: "Invalid product",
            errors: errors.array()
        })
    }
]
import { body, validationResult } from "express-validator";

export const registerValidation = [
    body('email')
        .exists().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),

    body('phone')
        .exists().withMessage('Phone is required')
        .isMobilePhone("en-IN").withMessage('Invalid phone'),

    body('password')
        .exists().withMessage('Password is required')
        .trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "invalid request",
                error: errors.array()
            })
        }

        next()
    }
]
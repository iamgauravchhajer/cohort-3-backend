import { body, validationResult } from 'express-validator'

const registerUserValidator = [
    body('email')
    .exists().withMessage("Email is required").bail()
    .trim().notEmpty().withMessage('Email is required').bail()
    .isEmail().withMessage('Invalid email').bail(),
    
    body('name')
    .exists().withMessage('Name is required').bail()
    .trim().notEmpty().withMessage('Name is required').bail()
    .isLength({min:2, max:50}).withMessage('Name must be between 2 and 50 characters long').bail(),

    body('password')
    .exists().withMessage('Password is required').bail()
    .trim().notEmpty().withMessage('Password is required').bail()
    .isLength({min:6}).withMessage('Password must be at least 6 characters long').bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
    
    ]


export { registerUserValidator }
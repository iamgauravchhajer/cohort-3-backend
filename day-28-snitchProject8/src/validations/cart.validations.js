import {body, validationResult} from 'express-validator';


export const cartValidation = [
    body('productId')
    .exists().withMessage('Product id is required').bail()
    .isString().withMessage('Product id must be a string').bail()
    .isMongoId().withMessage('Invalid product id').bail(),

    body('quantity')
    .exists().withMessage('Quantity is required').bail()
    .isNumeric().withMessage('Quantity must be a number').bail()
    .isInt({min: 1}).withMessage('Quantity must be a positive integer').bail(),

    body('size')
    .exists().withMessage('Size is required').bail()
    .isString().withMessage('Size must be a string').bail()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL']).withMessage('Invalid size').bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]
    
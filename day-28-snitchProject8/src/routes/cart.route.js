import express from 'express';
import { addToCart, getCart } from '../controllers/cart.controller.js';
import { cartValidation } from '../validations/cart.validations.js';
import { authenticate} from '../middleware/auth.middleware.js';

const cartRouter = express.Router();

cartRouter.post(
    '/add',
    authenticate,
    cartValidation,
    addToCart
);
cartRouter.get("/", authenticate, getCart);

export default cartRouter;

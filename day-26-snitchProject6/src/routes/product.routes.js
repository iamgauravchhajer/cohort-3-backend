import { Router } from "express";
import { authenticate, sellerRoleAuthorization } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts } from "../controllers/product.controller.js";
import upload from "../config/multer.config.js";
import { parseProductData } from "../middleware/parseFormData.js";
import { createProductValidator } from "../validations/product.validator.js";

const productRouter = Router();

productRouter.post(
    '/create',
    authenticate,
    sellerRoleAuthorization,
    upload.array('images', 5),
    parseProductData,
    createProductValidator,
    createProduct
);
productRouter.get('/', getAllProducts)

export default productRouter;
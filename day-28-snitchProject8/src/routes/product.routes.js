import { Router } from "express";
import { authenticate, sellerRoleAuthorization } from "../middleware/auth.middleware.js";
import { createProduct, getAllProducts, unlistProduct, listProduct, getSellerProducts } from "../controllers/product.controller.js";
import upload from "../config/multer.config.js";
import { parseProductData } from "../middleware/parseFormData.js";
import { createProductValidator, unlistProductValidator } from "../validations/product.validator.js";

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
productRouter.get('/seller', authenticate, sellerRoleAuthorization, getSellerProducts)
productRouter.patch('/list/:id', authenticate, sellerRoleAuthorization, unlistProductValidator, listProduct)
productRouter.patch('/unlist/:id', authenticate, sellerRoleAuthorization, unlistProductValidator, unlistProduct)

export default productRouter;
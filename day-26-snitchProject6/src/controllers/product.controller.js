import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"

export const createProduct = async (req, res) => {
    try {
        let imagesURL = [];
        for(let i = 0; i < req.files.length; i++) {
            const response = await uploadFile({
                fileBuffer: req.files[i].buffer,
                fileName: req.files[i].originalname
            });
            imagesURL.push(response.url);
        }

        const {title, description, price, sizes, seller} = req.body;

        const product = await productModel.create({
            title,
            description,
            price,
            sizes,
            seller,
            images: imagesURL
        });

        return res.status(200).json({
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find();

        return res.status(200).json({
            message: "Products fetched successfully",
            products
        })
    } catch (error) {
        console.log(error)
    }
}
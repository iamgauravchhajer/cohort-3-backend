import { uploadFile } from "../services/storage.service.js"
import productModel from "../models/product.model.js"

export const createProduct = async (req, res) => {
    try {
        // Upload all files concurrently instead of sequentially. 
        const uploadResults = await Promise.all(
            req.files.map(file => uploadFile({
                fileBuffer: file.buffer,
                fileName: file.originalname
            }))
        );
        const imagesURL = uploadResults.map(result => result.url);

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
        console.error(error);
        return res.status(500).json({ message: "Failed to create product", error: error.message });
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({published: true});

        return res.status(200).json({
            message: "Products fetched successfully",
            products
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
}

export const getSellerProducts = async (req, res) => {
    try{
        const seller = req.user.id;

        const products = await productModel.find({seller});

        return res.status(200).json({
            message: "Products fetched successfully",
            products
        })
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Failed to fetch products", error: error.message });
    }
}

export const listProduct = async (req, res)=>{
    try{
        const {id} = req.params;
        
        const product = await productModel.findById(id)

        if(!product){ return res.status(404).json({message: "Product not found"})}

        await productModel.findByIdAndUpdate(id, {published: true})

        return res.status(200).json({message: "Product listed successfully"})

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Failed to list product", error: error.message });
    }
}

export const unlistProduct = async (req, res)=>{
    try{
        const {id} = req.params;
        
        const product = await productModel.findById(id)

        if(!product){ return res.status(404).json({message: "Product not found"})}

        await productModel.findByIdAndUpdate(id, {published: false})

        return res.status(200).json({message: "Product unlisted successfully"})

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Failed to unlist product", error: error.message });
    }
}

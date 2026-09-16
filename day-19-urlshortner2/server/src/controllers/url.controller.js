import urlModel from "../model/url.model.js";
import { generateCode } from "../utils/generateCode.js";

const generateUrl = async (req, res) => {
    try {
        const url = req.body.url;

        if (!url) { return res.status(400).json({ message: "Url is required" }) }
        if (!url.startsWith("https://") && !url.startsWith("http://")) {
            return res.status(400).json({ message: "Please enter a valid url starting with https:// or http://" })
        }
        if (url.length > 2048) { return res.status(400).json({ message: "Url is too long" }) }

        const code = generateCode();
        const newUrl = await urlModel.create({
            originalUrl: url,
            uniqueCode: code,
            clickCount: 0
        });

        return res.status(201).json({ message: "Url created successfully", newUrl });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}  

const redirectUrl = async (req, res) => {
    try {
        const code = req.params.code;
        const urlRecord = await urlModel.findOneAndUpdate(
            { uniqueCode: code },
            { $inc: { clickCount: 1 } },
            { returnDocument: 'after' }
        );

        if (!urlRecord) {
            return res.status(404).json({ message: "Url not found" });
        }

        return res.redirect(302, urlRecord.originalUrl);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const deleteUrl = async (req, res) => {
    try {
        const code = req.params.code;
        const urlRecord = await urlModel.findOneAndDelete({ uniqueCode: code });
        if(!urlRecord){
            return res.status(404).json({ message: "Url not found" });
        }
        return res.status(200).json({ message: "Url deleted successfully", urlRecord });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }   
}

const getAllUrls = async (req, res) => {
    try {
        const urls = await urlModel.find();
        return res.status(200).json({ urls });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export { generateUrl, redirectUrl, deleteUrl, getAllUrls }
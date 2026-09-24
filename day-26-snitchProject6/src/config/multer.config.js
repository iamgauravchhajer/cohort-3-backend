import multer from "multer";

const storage = multer.memoryStorage();
const limits = {
    files: 5,
    fileSize: 15 * 1024 * 1024,
}

const upload = multer({ storage: storage, limits: limits });


export default upload
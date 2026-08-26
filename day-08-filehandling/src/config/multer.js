const multer = require('multer')

const storageToLocal = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        console.log(file)
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const storageToServer = multer.memoryStorage()

const uploadToLocal = multer({storageToLocal})
const uploadToServer = multer({storageToServer})

module.exports = {uploadToLocal, uploadToServer}
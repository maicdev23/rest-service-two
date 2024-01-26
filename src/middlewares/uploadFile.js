import multer from "multer"; import path from "path";

/*const storage = multer.diskStorage({
    destination: '../resource-uploaded',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
}); export default multer({ storage }).single('file')*/

export default multer({ storage: multer.memoryStorage() }).single('file')
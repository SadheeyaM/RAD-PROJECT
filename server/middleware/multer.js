import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import fs from "fs";

// Ensure the 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const id = uuid();
    const extName = path.extname(file.originalname);
    const fileName = `${id}${extName}`;
    cb(null, fileName);
  },
});


// Middleware to handle file uploads and add text fields to req.body
export const uploadFiles = multer({ storage }).single("file");

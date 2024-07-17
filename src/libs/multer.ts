import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (_req, file, cb) => {
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_'); 
        cb(null, sanitizedFilename + path.extname(file.originalname));
    }
});

export default multer({ storage });

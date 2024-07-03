import { Router } from 'express';
import multer from '../libs/multer';
import { createPhoto , DeletePhoto, Getphoto, UpdatePhoto} from '../controllers/photocontroller';


const router = Router();

router.post('/',multer.single('image'),  createPhoto);
router.get('/',  Getphoto)
router.delete('/:id',DeletePhoto)
router.put('/:id',UpdatePhoto)

export { router };

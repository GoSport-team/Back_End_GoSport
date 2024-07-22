import { Router } from "express";
import { subirFoto } from "../controllers/fotoPerfil";
import multer from '../libs/multer';
const router = Router();

router.post('/:id', multer.single('file'),subirFoto);

export{ router };
import { Router } from "express";
import { actualizarPosicionesInter, guardarPosicionesInter, obtenerPosicionInter, obtenerPosicionesInter } from "../controllers/posicionesIntercentros";

const router = Router()



router.get('/', obtenerPosicionesInter)

router.get('/:id', obtenerPosicionInter)

router.post('/', guardarPosicionesInter)

router.patch('/:id', actualizarPosicionesInter)


export {router}
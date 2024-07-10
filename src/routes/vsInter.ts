import { Router } from "express";
import {
    obtenerVSInter,
    obtenerVS1Inter,
    guardarVSInter,
    actualizarVSInter,
    eliminarVSInter
} from '../controllers/vsInter'

const router = Router()

router.get('/', obtenerVSInter);
router.get('/:id', obtenerVS1Inter)
router.post('/', guardarVSInter)
router.patch('/:id', actualizarVSInter)
router.delete('/:id', eliminarVSInter)

export {router}
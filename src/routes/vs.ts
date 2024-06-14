import { Router } from "express";
import {
    obtenerVS,
    obtenerVS1,
    guardarVS,
    actualizarVS,
    eliminarVS
} from '../controllers/vs'

const router = Router()

router.get('/', obtenerVS);
router.get('/:id', obtenerVS1)
router.post('/', guardarVS)
router.patch('/:id', actualizarVS)
router.delete('/:id', eliminarVS)

export {router}
import { Router } from "express";
import {
    guardarResultado,
    obtenerResultados,
    actualizarResultado,
    eliminarResultado

} from '../controllers/resultados'

const router = Router()

router.get('/', obtenerResultados)

router.post('/', guardarResultado)

router.patch('/:id', actualizarResultado)

router.delete('/:id', eliminarResultado)

export {router}

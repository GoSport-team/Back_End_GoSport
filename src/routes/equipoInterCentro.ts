import { Router } from "express";
import {
    obtenerEquiposInterCentro,
    obtenerEquipoInter,
    guardarEquipoInter,
    actualizaEquipo,
    eliminarEquipoInter
} from '../controllers/equipoInterCentro'

const router = Router()

router.get('/', obtenerEquiposInterCentro)

router.get('/:id', obtenerEquipoInter)

router.post('/', guardarEquipoInter)

router.patch('/:id', actualizaEquipo),

router.delete('/:id', eliminarEquipoInter)

export {router}
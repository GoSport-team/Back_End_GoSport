import { Router } from "express";
import {
    guardarInscripcionDeEquipo,
    obtenerInscripcionEquipo,
    obtenerInscripcionesEquipos,
    actualizaEquipo,
    eliminarEquipo

} from '../controllers/IncripconEquipos'

const router = Router()

router.get('/', obtenerInscripcionesEquipos)

router.get('/:id', obtenerInscripcionEquipo)

router.post('/', guardarInscripcionDeEquipo)

router.patch('/:id', actualizaEquipo),

router.delete('/:id', eliminarEquipo)

export {router}
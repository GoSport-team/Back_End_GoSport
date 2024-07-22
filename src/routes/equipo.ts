import { Router } from "express";
import {
    ObtenerEquipos,
    obtenerEquipo,
    guardarEquipo,
    actualizaEquipo,
    eliminarEquipo
} from '../controllers/equipo'


const router = Router()
router.get('/', ObtenerEquipos)
router.get('/:id', obtenerEquipo)
router.post('/',guardarEquipo)
router.patch('/:id', actualizaEquipo)
router.delete('/:id', eliminarEquipo)
export {router}
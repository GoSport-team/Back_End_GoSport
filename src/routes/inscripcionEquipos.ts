import { Router } from "express";
import {
    // equiposGanadores,
    guardarInscripcionDeEquipo,
    obtenerInscripcionEquipo,
    obtenerInscripcionesEquipos,
    actualizarEquipo,
    actualizarEquipoCompleto,
    eliminarEquipo,
    subirFoto,

} from '../controllers/IncripconEquipos'


const router = Router()
//colocar id discriptivo
// router.get('/ganadores', equiposGanadores)

router.post('/:id/logoEquipo', subirFoto)
router.get('/',  obtenerInscripcionesEquipos)

router.get('/:id', obtenerInscripcionEquipo)

router.post('/', guardarInscripcionDeEquipo)

router.patch('/completo/:id', actualizarEquipoCompleto)

router.patch('/:id', actualizarEquipo),

router.delete('/:id', eliminarEquipo)

export {router}
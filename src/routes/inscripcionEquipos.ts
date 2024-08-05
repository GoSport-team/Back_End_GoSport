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
    actualizarLogo,

} from '../controllers/IncripconEquipos'


const router = Router()
//colocar id discriptivo
// router.get('/ganadores', equiposGanadores)

router.post('/:id/logoEquipo', subirFoto)
router.get('/',  obtenerInscripcionesEquipos)
router.patch('/:id/:idLogo', actualizarLogo)
router.get('/:id', obtenerInscripcionEquipo)

router.post('/', guardarInscripcionDeEquipo)

router.patch('/completo/:id', actualizarEquipoCompleto)

router.patch('/:id', actualizarEquipo),

router.delete('/:id', eliminarEquipo)

export {router}
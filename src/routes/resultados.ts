import { Router } from "express";
import {
    siguienteFaseGanadores,
    guardarResultado,
    obtenerResultados,
    actualizarResultado,
    eliminarResultado,
    obtenerResultado,
    obtenerResultadosCampeonatos,
    // obtenerEstadisticas

} from '../controllers/resultados'

const router = Router()

router.get('/siguienteFase', siguienteFaseGanadores)

router.get('/', obtenerResultados)

router.get('/resultadoidcampeonato', obtenerResultadosCampeonatos)

router.get('/:id', obtenerResultado)

router.post('/', guardarResultado)

router.patch('/:id', actualizarResultado)

router.delete('/:id', eliminarResultado)

// router.get('/estadisticas/:idCampeonato', obtenerEstadisticas)

export {router}

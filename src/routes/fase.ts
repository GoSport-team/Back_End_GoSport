import { Router } from "express";
import {
    obtenerFaseCampeonato,
    GuardarFase,
    obtenerFase,
    obtenerFases,
    actualizarFase,
    actualizarFaseEstado,
    eliminarFase,
    obtenerEstadoEquipo
} from '../controllers/fase'


const router = Router()

router.get('/', obtenerFases)

router.get('/fase', obtenerFaseCampeonato)

router.get('/:id', obtenerFase)

router.post('/', GuardarFase)

router.patch('/:id', actualizarFase)

router.patch('/estado/:id', actualizarFaseEstado)

router.delete('/:id', eliminarFase)

router.get('/estadoEquipo/:idCampeonato', obtenerEstadoEquipo)

export {router};
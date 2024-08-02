import { Router } from "express";
import {
    obtenerFaseCampeonato,
    GuardarFase,
    obtenerFase,
    obtenerFases,
    actualizarFase,
    eliminarFase
} from '../controllers/fase'


const router = Router()

router.get('/', obtenerFases)

router.get('/fase', obtenerFaseCampeonato)

router.get('/:id', obtenerFase)

router.post('/', GuardarFase)

router.patch('/:id', actualizarFase)

router.delete('/:id', eliminarFase)

export {router};
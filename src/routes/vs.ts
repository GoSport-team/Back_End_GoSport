import { Router } from "express";
import {
    obtenerVS,
    obtenerVS1,
    guardarVS,
    eliminarVS,
    patchesVs,
    obtenerVSPlanillero,
    mejorPerdedor
} from '../controllers/vs'

const router = Router()
router.get('/planillero/:id', obtenerVSPlanillero)
router.get('/', obtenerVS);
router.get('/:id', obtenerVS1)
router.post('/', guardarVS)
router.patch('/:id', patchesVs)
router.delete('/:id', eliminarVS)
router.post('/mejorPerdedor', mejorPerdedor)

export {router}
import { Router } from "express";
import {
    obtenerVS,
    obtenerVS1,
    guardarVS,
    eliminarVS,
    patchesVs,
    obtenerVSPlanillero,
<<<<<<< HEAD
    mejorPerdedor
=======
    obtenerlosVsAsignadosAPlanillero
>>>>>>> be1ce345b08d298657e53ef1af8d672ab4e8391d
} from '../controllers/vs'

const router = Router()
router.get('/vsAsignadosPlanillero',obtenerlosVsAsignadosAPlanillero)
router.get('/planillero/:id', obtenerVSPlanillero)
router.get('/', obtenerVS);
router.get('/:id', obtenerVS1)
router.post('/', guardarVS)
router.patch('/:id', patchesVs)
router.delete('/:id', eliminarVS)
router.post('/mejorPerdedor', mejorPerdedor)

export {router}
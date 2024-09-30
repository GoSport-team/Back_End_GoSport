import { Router } from "express";
import {
    obtenerVS,
    obtenerVS1,
    guardarVS,
    eliminarVS,
    patchesVs,
    obtenerVSPlanillero,
    mejorPerdedor,
    obtenerlosVsAsignadosAPlanillero,
    buscarVS,
    obtenerVSCampeonato,

   
} from '../controllers/vs'

const router = Router()
router.get('/vsAsignadosPlanillero',obtenerlosVsAsignadosAPlanillero)
router.get('/planillero/:id', obtenerVSPlanillero)
router.get('/vscampeonato', obtenerVSCampeonato)
router.get('/', obtenerVS);
router.get('/:id', obtenerVS1)
router.post('/', guardarVS)
router.patch('/:id', patchesVs)
router.delete('/:id', eliminarVS)
router.post('/mejorPerdedor', mejorPerdedor)
router.get("/buscar/:equipoId", buscarVS);



export {router}
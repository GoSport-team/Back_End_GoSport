import { Router } from "express";
import {
    obtenerVSInter,
    obtenerVS1Inter,
    guardarVSInter,
    actualizarVSInter,
    eliminarVSInter,
    buscarVSInter,
    obtenerlosVsAsignadosAPlanilleroIntercenntros
} from '../controllers/vsInter'


const router = Router()

router.get('/', obtenerVSInter);
router.get('/:id', obtenerVS1Inter)
router.post('/', guardarVSInter)
router.patch('/:id', actualizarVSInter)
router.delete('/:id', eliminarVSInter)
router.get("/buscarInter/:equipoId", buscarVSInter)
router.get('/vsAsignadosPlanilleroIntercentros/:id',obtenerlosVsAsignadosAPlanilleroIntercenntros)

  


export {router}